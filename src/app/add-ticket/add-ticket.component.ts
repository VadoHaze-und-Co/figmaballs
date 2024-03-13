import { Component } from '@angular/core';
import {DataService} from "../services/data-service";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

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

  public fillFiles(event: any) {
    for (let file of event.target.files) {
      this.files = this.files.filter(f => f.name != file.name);
      this.files.push(file);
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
}
