import { Routes } from '@angular/router';
import {AddTicketComponent} from "./add-ticket/add-ticket.component";
import {HomepageComponent} from "./homepage/homepage.component";
import {TicketDetailComponent} from "./ticket-detail/ticket-detail.component";
import {LoginComponent} from "./login/login.component";
import {BenutzerVerwaltungComponent} from "./benutzer-verwaltung/benutzer-verwaltung.component";
import {TicketlistComponent} from "./ticketlist/ticketlist.component";
import {BenutzerErstellungComponent} from "./benutzer-erstellung/benutzer-erstellung.component";
import {LoggingPageComponent} from "./logging-page/logging-page.component";

export const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'users', component: BenutzerVerwaltungComponent},
  { path: 'user-create', component: BenutzerErstellungComponent},
  { path: 'tickets', component: TicketlistComponent},
  { path: 'ticket/:id', component: TicketDetailComponent},
  { path: 'ticket-create', component: AddTicketComponent },
  { path: 'logs', component: LoggingPageComponent }
];
