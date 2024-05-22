import { Component } from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {DataService} from "./services/data-service";
import {AddTicketComponent} from "./add-ticket/add-ticket.component";
import {SideBarComponent} from "./side-bar/side-bar.component";
import {NgIf} from "@angular/common";
import {HomepageComponent} from "./homepage/homepage.component";
import {TicketDetailComponent} from "./ticket-detail/ticket-detail.component";
import { BenutzerVerwaltungComponent } from './benutzer-verwaltung/benutzer-verwaltung.component';
import {Account} from "./rest-objects/account";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, AddTicketComponent, DataService, SideBarComponent, NgIf, HomepageComponent, TicketDetailComponent, BenutzerVerwaltungComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'figmaballs';
  public static account: Account | undefined;

  constructor(public dataService: DataService, private router: Router) {
    for (let elementsByTagNameKey in document.getElementsByTagName('div')) {

    }
    if (this.dataService.getAccountId() == 0) {
      this.router.navigateByUrl('/login');
    }
  }

  public transitionFix() {
    if (this.dataService.sideBarService.dragging) {
      return '0s';
    }
    return '.2s';
  }
}
