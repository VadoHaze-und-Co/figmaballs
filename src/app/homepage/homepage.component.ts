import { Component } from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {
  ArcElement,
  CategoryScale,
  Chart,
  ChartConfiguration,
  Colors,
  DoughnutController,
  Legend, SubTitle, Title,
  Tooltip
} from 'chart.js';
import {NgForOf, NgIf} from "@angular/common";
import {DataService} from "../services/data-service";
import {Ticket} from "../rest-objects/ticket";
import {Router} from "@angular/router";
import {NgbDropdownItem} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-homepage',
  standalone: true,
    imports: [
        BaseChartDirective,
        NgForOf,
        NgIf,
        NgbDropdownItem
    ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})

export class HomepageComponent {
// Doughnut
  public tickets: Ticket[] = this.dataService.getTickets();
  public todayTickets: number = this.getTodayTickets(this.dataService.getTickets()).length;
  public doughnutChartLabels: string[] = [ "Alle Tickets", "Offene Tickets", "Überfällige Tickets", "Nicht zugewiesen", "Tickets für Heute" ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: this.getDataFromBackend(), label: 'Tickets' }
  ];
  //selfAssessmentData.datasets[tooltipItem.datasetIndex]
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(tooltipItem) {
            var dataPoint = this.dataPoints[tooltipItem.datasetIndex];
            var total = dataPoint.dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
              return previousValue + currentValue;
            });
            var currentValue = dataPoint.dataset.data[tooltipItem.dataIndex]; // Use tooltipItem.index here
            var percentage = Math.floor(((currentValue/total) * 100)+0.5);
            return percentage + "%";
          }
        }
      },
      legend: {
        align: "start",
        labels: {
          color: "#b0b0b0",
          font: {
            size: 12
          }
        }
      }
    }
  };

  constructor(public dataService: DataService, private router: Router) {
    dataService.restService.loadTickets();
    Chart.register(DoughnutController, ArcElement, Tooltip, Legend, Colors);
  }

  public goToTicket(id: number | undefined) {
    if (id != undefined) {
      this.router.navigateByUrl('/ticket/' + id);
    }
  }

  public getDataFromBackend() : number[] {
    var tickets = this.dataService.getTickets();
    //return [tickets.length, 0/*tickets.sort(a => a.status = 0).length*/, 0, 0, 0];
    return [100, 24, 12, 56, 27];
  }

  public getOpenedTickets(): Ticket[] {
    return this.dataService.getTickets().sort(t => t.status = 0);
  }

  public getForgottenTickets(): Ticket[] {
    let tickets = this.dataService.getTickets();
    const forgottenTickets: Ticket[] = [];
    let month = 1000 * 60 * 60 * 24 * 28;
    for (let ticket of tickets) {
      if (ticket.creationDate! - month < Date.now()) {
        forgottenTickets.push(ticket);
      }
    }
    return forgottenTickets;
  }

  public getTodayTickets(tickets: Ticket[]): Ticket[] {
    //var todayTickets: List<Ticket> = new List<Ticket>();
    var todayTickets: Ticket[] = [];
    let now = new Date(Date.now());
    for (let ticket of tickets) {
      let date = new Date(ticket.creationDate!);
      if (date.getFullYear() == now.getFullYear()
        && date.getMonth() == now.getMonth()
        && date.getDay() == now.getDay()) {
        todayTickets.push(ticket);
      }
    }
    console.log(todayTickets.length);
    return todayTickets;
  }

}
