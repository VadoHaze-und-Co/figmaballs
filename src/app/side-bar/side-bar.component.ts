import { Component } from '@angular/core';
import {DataService} from "../services/data-service";
import {NgForOf, NgIf} from "@angular/common";
import {User} from "../rest-objects/user";
import {RouterLink} from "@angular/router";
import {group} from "@angular/animations";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  public groups: {[key: string]: {[name: string]: {path: string, admin: boolean}}} = {
    'Ticket':
      {
        'Ticket erstellen': {path: 'ticket-create', admin: false},
        'Ticketliste': {path: 'tickets', admin: false}
      },
    'Benutzer':
      {
        'Benutzerverwaltung': {path: 'users', admin: false},
        'Benutzererstellung': {path: 'user-create', admin: true}
      },
    'Utils':
      {
        'Logs': {path: 'logs', admin: true}
      }
  };

  public allowedGroups: string[] = [];

  constructor(public dataService: DataService) {
    this.load(this.groups);
  }

  ngOnInit() {

  }

  public async load(map: {[key: string]: any}) {
    let users = await this.dataService.restService.getUsersSync();
    let user = users.filter(e => e.id == this.dataService.getAccountId())[0];
    for (let group in map) {
      if (!map[group].admin || (map[group].admin && user.admin)) {
        this.allowedGroups.push(group);
      }
    }
  }

  public keys() {
    return this.allowedGroups;
  }

  public values(map: {[key: string]: any}) {
    let g: string[] = [];
    for (let group in map) {
      g.push(group);
    }
    return g;
  }
}
