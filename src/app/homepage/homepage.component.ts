import { Component } from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {
  ArcElement,
  Chart,
  ChartConfiguration,
  Colors,
  DoughnutController,
  Legend,
  Tooltip
} from 'chart.js';
import {NgForOf, NgIf} from "@angular/common";
import {DataService} from "../services/data-service";
import {Ticket} from "../rest-objects/ticket";
import {Router} from "@angular/router";
import {NgbDropdownItem} from "@ng-bootstrap/ng-bootstrap";
import {map, Observable} from "rxjs";
import {tick} from "@angular/core/testing";

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
  public datasetsForChart: number[] = [1,1,1,1]
  /*public doughnutChartLabels: string[] = [
    this.getOpenedTickets(this.tickets).length + " Offene Tickets",
    this.getWorkingTickets(this.tickets).length + " Tickets in Arbeit",
    this.getFinishedTickets(this.tickets).length + " Abgeschlossene Tickets",
    this.getOverdueTickets(this.tickets).length + " Überfällige Tickets"
  ];*/

  // Die scheiße datasets lässt nicht die Werte auslesen, muss ich mal in der html umsetzen.      - Ali
  /*public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [
        2,
        2,
        2,
        2
      ]}
  ];*/
  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function(tooltipItem) {
            let dataPoint = this.dataPoints[tooltipItem.datasetIndex];
            let total = dataPoint.dataset.data.reduce(function (previousValue, currentValue, currentIndex, array) {
              return previousValue + currentValue;
            });
            let currentValue = dataPoint.dataset.data[tooltipItem.dataIndex]; // Use tooltipItem.index here
            let percentage = Math.floor(((currentValue / total) * 100) + 0.5);
            return percentage + "%";
          },
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

  public getOpenedTickets(tickets: Ticket[]) {
    let newTickets = tickets;
    return newTickets.filter(a => a.status! == 0);
  }

  public getFinishedTickets(tickets: Ticket[]) {
    let newTickets = tickets;
    return newTickets.filter(t => t.status! == 2);
  }

  public getWorkingTickets(tickets: Ticket[]) {
    let newTickets = tickets;
    return newTickets.filter(t => t.status! == 1);
  }

  public getOverdueTickets(tickets: Ticket[]) {
    let newTickets = tickets;
    return newTickets.filter(t => t.creationDate! < (Date.now() - 2419200)).sort();
  }

}
