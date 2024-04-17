import { Routes } from '@angular/router';
import {AddTicketComponent} from "./add-ticket/add-ticket.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {TicketDetailComponent} from "./ticket-detail/ticket-detail.component";
import {TicketlistComponent} from "./ticketlist/ticketlist.component";

export const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full'},
  { path: 'homepage', component: HomepageComponent },
  { path: 'tickets', component: TicketlistComponent},
  { path: 'ticket/:id', component: TicketDetailComponent},
  { path: 'ticket-create', component: AddTicketComponent }
];
