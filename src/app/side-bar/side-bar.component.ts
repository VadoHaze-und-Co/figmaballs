import { Component } from '@angular/core';
import {DataService} from "../services/data-service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {

  public groups: {[key: string]: {[name: string]: {path: string}}} = {
    'Ticket': {'Ticket erstellen': {path: 'ticket-create'}}
  };

  constructor(public dataService: DataService) {

  }

  public keys(map: {[key: string]: any}) {
    let groups: string[] = [];
    for (let group in map) {
      groups.push(group);
    }
    return groups;
  }
}
