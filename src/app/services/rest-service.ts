import {catchError, EMPTY, firstValueFrom, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ticket} from "../rest-objects/ticket";
import {DataService} from "./data-service";
import {Category} from "../rest-objects/category";
import {Append} from "../rest-objects/append";
import {Login} from "../rest-objects/login";
import {TicketComment} from "../rest-objects/ticket_comment";
import {User} from "../rest-objects/user";
import {Account} from "../rest-objects/account";
import {CookieService} from "ngx-cookie-service";
import {Log} from "../rest-objects/log";

export class RestService {

  constructor(private http: HttpClient, public dataService: DataService, private cookieService: CookieService) {
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
    //console.log(method + " " + url + ": " + JSON.stringify(body));
    return this.http.request(method, url, option)
      .pipe(catchError(error => {
        return EMPTY;
      }));
  }

  private async httpRequest(url: string, method: string, func: (data: any) => void, body?: any) {
    this.httpObservable(url, method, body).subscribe(data => {
      //console.log("result: " + JSON.stringify(data));
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
    let escalation: boolean = this.cookieService.check("auto-escalation");
    if (escalation) {
      this.httpRequest('http://localhost:8089/tickets/auto', 'GET', data => {
        (<Ticket[]>data).forEach(e => this.dataService.tickets.push(new Ticket(e.id, e.title, e.description, e.status, e.priority, e.creationDate, e.finishDate, e.categories)));
      },true);
    } else {
      this.httpRequest('http://localhost:8089/tickets', 'GET', data => {
        (<Ticket[]>data).forEach(e => this.dataService.tickets.push(new Ticket(e.id, e.title, e.description, e.status, e.priority, e.creationDate, e.finishDate, e.categories)));
      },true);
    }
  }

  public loadUsers() {
    this.httpRequest('http://localhost:8089/users', 'GET', data => {
      (<User[]>data).forEach(e => this.dataService.users.push(new User(e.id, e.userName, e.firstName, e.lastName, e.emailAddress, e.address, e.postcode, e.city, e.profilPicture, e.qualifikation, e.admin)));
    });
  }

  public loadComments() {
    this.httpRequest('http://localhost:8089/comments', 'GET', data => {
      (<TicketComment[]>data).forEach(e => this.dataService.comments.push(new TicketComment(e.id, e.ticketId, e.userId, e.comment, e.commentDate, e.edited)));
    });
  }

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

  public getUsers() {
    this.httpRequest('http://localhost:8089/users', 'GET', data => {
      (<User[]>data).forEach(e => this.dataService.users.push(new User(e.id,e.userName, e.firstName, e.lastName, e.emailAddress, e.address, e.postcode, e.city,e.profilPicture,e.qualifikation, e.admin)));
    });
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
    this.httpRequest(`http://localhost:8089/comments/${comment.id}`, "DELETE", data => {
      comment
     }).then(r => r);
  }

  // LOGIN & LOGOUT

  public login(login: Login) {
    this.httpRequest('http://localhost:8089/login', 'POST', data => {
      let account = (<Account>data);
      this.cookieService.set('account.id',`${account.id}`);
      this.cookieService.set('account.userId',`${account.userId}`);
    }, login).catch(err => this.cookieService.set('err',err));
  }

  public logout() {
    this.cookieService.delete('account.id');
    this.cookieService.delete('account.userId');
  }

  public createLog(log: Log) {
    this.httpRequest('http://localhost:8089/log', 'POST', data => {
    }, log);
  }

  public getLogs(page: number, amount: number, result: Log[]) {
    this.httpRequest(`http://localhost:8089/log/` + page + "/" + amount, 'GET', data => {
      (<Log[]>data).forEach(e=> result.push(new Log(e.user, e.object, e.action, e.message, e.timestamp)));
    });
  }
}
