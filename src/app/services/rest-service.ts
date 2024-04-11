import {catchError, EMPTY, firstValueFrom} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ticket} from "../rest-objects/ticket";
import {DataService} from "./data-service";
import {Injectable} from "@angular/core";
import {Category} from "../rest-objects/category";
import {tick} from "@angular/core/testing";

export class RestService {

  constructor(private http: HttpClient, public dataService: DataService) {
    let token = localStorage.getItem("token");
    if (token === null || token == "") {
      return;
    }
  }

  private async httpRequest(url: string, method: string, func: (data: any) => void, body?: any) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
    let option = {body: JSON.stringify(body), headers: headers};
    console.log(method + " " + url + ": " + JSON.stringify(body));
    this.http.request(method, url, option)
      .pipe(catchError(error => {
        return EMPTY;
      })).subscribe(data => {
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
    (<Ticket[]>data).forEach(e => this.dataService.tickets.push(new Ticket(e.id, e.title, e.description, e.status, e.creationDate, e.categories)));
    });
  }

  public loadTicket(id: number | undefined): Ticket {
    let ticket: Ticket = new Ticket();
    if (id != undefined) {
      this.httpRequest('http://localhost:8089/tickets/' + id, 'GET', data => {
        ticket =  new Ticket((<Ticket>data).id,(<Ticket>data).title,(<Ticket>data).description,(<Ticket>data).status,(<Ticket>data).creationDate);
      });
    }
    return ticket;
  }

  public createTicket(ticket: Ticket) {
    this.httpRequest('http://localhost:8089/tickets', 'POST', data => {
    }, ticket);
  }

  public createCategory(category: Category) {
    this.dataService.categories.push(category);
    this.httpRequest('http://localhost:8089/categories', 'POST', data => {
    }, {name: category.name!});
  }

}
