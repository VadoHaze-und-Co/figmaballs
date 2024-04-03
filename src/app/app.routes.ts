import { Routes } from '@angular/router';
import {AddTicketComponent} from "./add-ticket/add-ticket.component";
import {HomepageComponent} from "./homepage/homepage.component";

export const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: 'ticket-create', component: AddTicketComponent }
];
