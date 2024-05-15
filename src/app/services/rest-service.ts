import {catchError, EMPTY, firstValueFrom, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ticket} from "../rest-objects/ticket";
import {DataService} from "./data-service";
import {Injectable} from "@angular/core";
import {Category} from "../rest-objects/category";
import {tick} from "@angular/core/testing";
import {Append} from "../rest-objects/append";
import {TicketComment} from "../rest-objects/ticket_comment";
import {User} from "../rest-objects/user";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

export class RestService {

  constructor(private http: HttpClient, public dataService: DataService) {
    let token = localStorage.getItem("token");
    if (token === null || token == "") {
      return;
    }
  }

  private httpObservable(url: string, method: string, body?: any) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Type', 'application/octet-stream')
    let option = {body: JSON.stringify(body), headers: headers};
    console.log(method + " " + url + ": " + JSON.stringify(body));
    let result = this.http.request(method, url, option)
      .pipe(catchError(error => {
        return EMPTY;
      }));
    return result;
  }

  private async httpRequest(url: string, method: string, func: (data: any) => void, body?: any) {
    this.httpObservable(url, method, body).subscribe(data => {
      console.log("result: " + JSON.stringify(data));
      func(data);
    });
  }

  // LOAD

  public loadCategories() {
    this.httpRequest('http://localhost:8089/categories/', 'GET', data => {
      (<Category[]>data).forEach(e => this.dataService.categories.push(new Category(e.id, e.name)));
    });
  }

  public loadTickets() {
    this.httpRequest('http://localhost:8089/tickets', 'GET', data => {
    (<Ticket[]>data).forEach(e => this.dataService.tickets.push(new Ticket(e.id, e.title, e.description, e.status, e.priority, e.creationDate, e.categories)));
    });
  }

  public loadUsers() {
    this.httpRequest('http://localhost:8089/users', 'GET', data => {
      (<User[]>data).forEach(e => this.dataService.users.push(new User(e.id, e.userName, e.firstName, e.lastName, e.emailAddress, e.address, e.postcode, e.city, e.admin, e.userGroups, e.comments)));
    });
  }

  public loadComments() {
    this.httpRequest('http://localhost:8089/comments', 'GET', data => {
      (<TicketComment[]>data).forEach(e => this.dataService.comments.push(new TicketComment(e.id, e.ticketId, e.userId, e.comment, e.commentDate, e.edited)));
    });
  }

  /*public loadCommentsByTicketId(ticketId: number) {
    this.httpRequest(`http://localhost:8089/comments/ticket/${ticketId}`, 'GET', data => {
      (<TicketComment[]>data).forEach(e => this.dataService.comments.push(new TicketComment(e.id, e.ticketId, e.userId, e.comment, e.commentDate, e.edited)));
    });
  }*/

  public async loadTicket(id: number): Promise<Ticket> {
    return await firstValueFrom(
      this.http.get<Ticket>(`http://localhost:8089/tickets/${id}`, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
    );
  }

  public async loadUser(id: number): Promise<User> {
    return await firstValueFrom(
      this.http.get<User>(`http://localhost:8089/users/${id}`, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
    );
  }

  public async loadComment(id: number): Promise<TicketComment> {
    return await firstValueFrom(
      this.http.get<TicketComment>(`http://localhost:8089/comments/${id}`, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
    );
  }

  public createTicket(ticket: Ticket) {
    this.httpRequest('http://localhost:8089/tickets', 'POST', data => {
    }, ticket);
  }

  public createUser(user: User) {
    this.httpRequest('http://localhost:8089/users', 'POST', data => {
    }, user);
  }
  
  public createComment(comment: TicketComment) {
    this.httpRequest('http://localhost:8089/comments', 'POST', data => {
    }, comment);
  }
  public deleteTicket(id: number) {
    this.dataService.tickets = this.dataService.tickets.filter(e=>e.id != id);
    this.httpRequest(`http://localhost:8089/tickets/${id}`, 'DELETE', data => {
    });
  }

  public createAppend(append: Append) {
    return <Observable<Append>>this.httpObservable('http://localhost:8089/append', 'POST', append);
  }

  public async getAppend(id: number) {
    return await firstValueFrom(<Observable<Append>>this.httpObservable(`http://localhost:8089/append/${id}`, 'GET'));
  }

  public createCategory(category: Category) {
    this.dataService.categories.push(category);
    this.httpRequest('http://localhost:8089/categories', 'POST', data => {
    }, {name: category.name!});
  }

  public updateTicket(ticket: Ticket) {
    return firstValueFrom(this.http.put(`http://localhost:8089/tickets/${ticket.id}`, ticket, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }));
  }
  

  public updateUser(user: User) {
    return firstValueFrom(this.http.put(`http://localhost:8089/users/${user.id}`, user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }));
  }

  public updateComment(comment: TicketComment) {
    if (!comment.edited) {
      comment.edited = true;
    }
    return firstValueFrom(this.http.put(`http://localhost:8089/comments/${comment.id}`, comment, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }));
  }

  public deleteComment(comment: TicketComment) {
    this.httpRequest(`http://localhost:8089/comments/${comment.id}`, "DELETE", data => {comment});
  }

}
