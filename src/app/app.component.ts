import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {DataService} from "./services/data-service";
import {AddTicketComponent} from "./add-ticket/add-ticket.component";
import {SideBarComponent} from "./side-bar/side-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, AddTicketComponent, DataService, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'figmaballs';

  constructor(public dataService: DataService) {
  }
}
