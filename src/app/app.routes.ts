import { Routes } from '@angular/router';
import {AddTicketComponent} from "./add-ticket/add-ticket.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {TicketDetailComponent} from "./ticket-detail/ticket-detail.component";
import {BenutzerVerwaltungComponent} from "./benutzer-verwaltung/benutzer-verwaltung.component";

export const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full'},
  { path: 'homepage', component: HomepageComponent },
  { path: 'tickets', component: HomepageComponent},
  { path: 'users', component: BenutzerVerwaltungComponent},
  { path: 'ticket/:id', component: TicketDetailComponent},
  { path: 'ticket-create', component: AddTicketComponent }
];
