import {catchError, EMPTY, firstValueFrom} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Ticket} from "../rest-objects/ticket";
import {DataService} from "./data-service";
import {Injectable} from "@angular/core";

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
      // .set('Accept', 'application/json')
      // .set('Access-Control-Allow-Origin', '*')
    let option = {body: body, headers: headers};
    this.http.request(method, url, option)
      .pipe(catchError(error => {
        return EMPTY;
      })).subscribe(data => func(data));
  }

  // LOAD

  public loadEmployees() {
    this.httpRequest('http://localhost:8089/v3/api/figmaballs/ticket/getAll', 'GET', data => {
      console.log(data)
    });
  }

  public createTicket(ticket: Ticket) {
    let headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Access-Control-Allow-Origin', 'http://localhost:4200')
      .set("Access-Control-Allow-Methods", "OPTIONS, POST, GET")
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Credentials', 'true')
    console.log(ticket)
    this.httpRequest('http://localhost:8089/v3/api/figmaballs/tickets/create', 'POST', data => {
      console.log(data)
    }, {body: ticket, headers: headers});
  }
}
