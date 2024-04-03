import {catchError, EMPTY, firstValueFrom} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ticket} from "../rest-objects/ticket";
import {DataService} from "./data-service";

export class RestService {

  constructor(private http: HttpClient, public dataService: DataService) {
    let token = localStorage.getItem("token");
    if (token === null || token == "") {
      return;
    }
  }

  private async httpRequest(url: string, method: string, func: (data: any) => void, body?: any) {
    let option = {body: body}; //headers: this.dataService.header,
    this.http.request(method, url, option)
      .pipe(catchError(error => {
        return EMPTY;
      })).subscribe(data => func(data));
  }

  // LOAD

  public loadEmployees() {
    this.httpRequest('https://employee.szut.dev/tickets', 'GET', data => {
      this.dataService.tickets = (data as Ticket[])
        .map(ticket => new Ticket(ticket.id, ticket.description, ticket.status, ticket.creationDate, ticket.finishDate, ticket.appends, ticket.categories));
    });
  }
}
