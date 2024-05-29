import { Component } from '@angular/core';
import {DataService} from "../services/data-service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {RestService} from "../services/rest-service";
import {Ticket} from "../rest-objects/ticket";
import {tick} from "@angular/core/testing";
import {Append} from "../rest-objects/append";
import {forkJoin, Observable} from "rxjs";
import {Log} from "../rest-objects/log";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-ticket',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule,
    NgIf
  ],
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.css'
})
export class AddTicketComponent {

  public title = "";
  public description = "";
  public categories: {[key: string]: boolean} = {};
  public files: File[] = [];

  constructor(public dataService: DataService, private router: Router) {
    dataService.restService.loadCategories();
  }

  public getSelectedCategories() {
    let ids: {[key: string]: number} = {};
    this.dataService.categories.forEach(category => ids[category.name!] = category.id!);
    let result: number[] = [];
    for (let name in this.categories) {
      if (this.categories[name]) {
        result.push(ids[name]);
      }
    }
    return result;
  }

  public fillFiles(event: any) {
    for (let file of event.target.files) {
      this.files = this.files.filter(f => f.name != file.name);
      this.files.push(file);
  /*public async fillFiles(event: any) {
    this.files = event.target.files;
    // event.target;
    for (let file of this.files) {
      console.log(file);*/
    }
    this.files = this.files.sort((a, b) => a.name.localeCompare(b.name));
  }

  public deleteFile(deleteFile: File) {
    let files: File[] = [];
    for (let file of this.files) {
      if (file == deleteFile) {
        continue;
      }
      files.push(file);
    }
    this.files = files;
  }

  public async create() {
    let ticket = new Ticket();
    ticket.title = this.title;
    ticket.description = this.description;
    ticket.categories = this.getSelectedCategories();
    ticket.creationDate = Date.now();
    ticket.assignment = 0;

    let appends: Observable<Append>[] = [];
    for (let file of this.files) {
      appends.push(this.dataService.restService.createAppend(new Append(0, file.name, await file.text())));
    }
    if (appends.length == 0) {
      ticket.appends = [];
      this.dataService.restService.createTicket(ticket);
    } else {
      forkJoin(appends).subscribe(append => {
        ticket.appends = append.map(e => e.id!);
        this.dataService.restService.createTicket(ticket);
      });
    }
    this.router.navigateByUrl('/tickets');
    // ticket.finishDate = new Date();
  }
}
