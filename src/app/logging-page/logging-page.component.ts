import { Component } from '@angular/core';
import {Log} from "../rest-objects/log";
import {DataService} from "../services/data-service";
import {ActivatedRoute} from "@angular/router";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-logging-page',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './logging-page.component.html',
  styleUrl: './logging-page.component.css'
})
export class LoggingPageComponent {

  public logs: Log[] = [];
  public page_: number = 0;

  public sortColumn = 1;

  constructor(public dataService: DataService) {
    this.page = 0;
  }

  public set page(page: number) {
    this.page_ = page;
    this.logs = [];
    this.dataService.restService.getLogs(this.page_, 50, this.logs);
  }

  public logsSorted() {
    return this.logs.sort((a, b) => {
      switch (this.sortColumn) {
        case 0:
          return a.user!.localeCompare(b.user!);
        case 1:
          return a.timestamp!.localeCompare(b.timestamp!);
        case 2:
          return a.object!.localeCompare(b.object!);
        case 3:
          return a.action!.localeCompare(b.action!);
      }
      return a.message!.localeCompare(b.message!);
    });
  }

  public get page() {
    return this.page_;
  }

  public sort(sort: number) {
    this.sortColumn = sort;
  }
}
