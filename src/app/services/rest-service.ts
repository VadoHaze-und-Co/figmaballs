import {catchError, EMPTY, firstValueFrom, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ticket} from "../rest-objects/ticket";
import {DataService} from "./data-service";
import {Injectable} from "@angular/core";
import {Category} from "../rest-objects/category";
import {tick} from "@angular/core/testing";
import {Append} from "../rest-objects/append";
import {Login} from "../rest-objects/login";

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
    let option = {body: JSON.stringify(body), headers: headers};
    console.log(method + " " + url + ": " + JSON.stringify(body));
    return this.http.request(method, url, option)
      .pipe(catchError(error => {
        return EMPTY;
      }));
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
    (<Ticket[]>data).forEach(e => this.dataService.tickets.push(new Ticket(e.id, e.title, e.description, e.status, e.priority, e.creationDate, e.finishDate, e.categories)));
    });
  }

  public async loadTicket(id: number): Promise<Ticket> {
    return await firstValueFrom(
      this.http.get<Ticket>(`http://localhost:8089/tickets/${id}`, {
        headers: new HttpHeaders().set('Content-Type', 'application/json'),
      })
    );
  }

  public createTicket(ticket: Ticket) {
    this.httpRequest('http://localhost:8089/tickets', 'POST', data => {
    }, ticket);
  }

  public createAppend(append: Append) {
    return <Observable<Append>>this.httpObservable('http://localhost:8089/append', 'POST', append);
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

  public login(login: Login): boolean {
    this.httpRequest('http://localhost:8089/login', 'POST', data => {
    }, login);
    return true;
  }

}
