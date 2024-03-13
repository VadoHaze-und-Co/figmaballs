import { Component } from '@angular/core';
import {DataService} from "../services/data-service";
import {NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-ticket',
  standalone: true,
  imports: [
    NgForOf,
    FormsModule
  ],
  templateUrl: './add-ticket.component.html',
  styleUrl: './add-ticket.component.css'
})
export class AddTicketComponent {

  public title = "";
  public description = "";
  public categories: {[key: string]: boolean} = {};
  public files: File[] = [];

  constructor(public dataService: DataService) {
    dataService.categories.forEach(category => this.categories[category] = false);
  }

  public getSelectedCategories() {
    let result: string[] = [];
    for (let name in this.categories) {
      if (this.categories[name]) {
        result.push(name);
      }
    }
    return result;
  }

  public async fillFiles(event: any) {
    this.files = event.target.files;
    // event.target;
    for (let file in this.files) {
      console.log(file);
    }
  }

  public deleteFile(file: File) {
    // this.files = this.
  }
}
