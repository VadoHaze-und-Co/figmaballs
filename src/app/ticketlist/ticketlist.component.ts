import { Component } from '@angular/core';
import {DataService} from "../services/data-service";
import {Router} from "@angular/router";
import {Ticket} from "../rest-objects/ticket";

@Component({
  selector: 'app-ticketlist',
  standalone: true,
  imports: [],
  templateUrl: './ticketlist.component.html',
  styleUrl: './ticketlist.component.css'
})
export class TicketlistComponent {
  public tickets: Ticket[] = this.dataService.getTickets();

  constructor(public dataService: DataService, private router: Router) {
    dataService.restService.loadTickets();
  }

  public goToTicket(id: number | undefined) {
    if (id != undefined) {
      this.router.navigateByUrl('/ticket/' + id);
    }
  }
}
