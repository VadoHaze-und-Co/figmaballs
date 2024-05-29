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
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {DataService} from "../services/data-service";
import {Ticket} from "../rest-objects/ticket";
import {Router} from "@angular/router";
import {NgbDropdownItem, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";
import {map, Observable} from "rxjs";
import {tick} from "@angular/core/testing";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    BaseChartDirective,
    NgForOf,
    NgIf,
    NgbDropdownItem,
    DatePipe,
    NgbDropdownToggle
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
    //console.log('Account id: ' + this.dataService.getAccountId());
  }

  public goToTicket(id: number | undefined) {
    if (id != undefined) {
      this.router.navigateByUrl('/ticket/' + id);
    }
  }

  public goToTicketList() {
    this.dataService.tickets = [];
      this.router.navigateByUrl('/tickets');
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

  public getHighlightTickets(tickets: Ticket[]) {
    let hTickets = tickets;
    let newTickets: Ticket[] = [];
    for (let ticket of hTickets) {
      if (ticket.status == 0 || ticket.status == 1 || ticket.status == 2) {
        newTickets.push(ticket);
      }
    }
    //newTickets = newTickets.sort((a, b) => b.priority! - a.priority!);
    newTickets = newTickets.sort((a, b) => a.creationDate! - b.creationDate!);
    console.log(newTickets);
    return newTickets;
  }

  protected readonly Date = Date;
}
