import {Injectable, Type} from "@angular/core";
import {Ticket} from "../rest-objects/ticket";

@Injectable({providedIn: "root"})
export class DataService {

  // Running data
  public tickets: Ticket[] = [];
}
