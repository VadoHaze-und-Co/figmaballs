import { Component } from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration, Chart} from 'chart.js';
import {NgForOf} from "@angular/common";
import {DataService} from "../services/data-service";
import {Ticket} from "../rest-objects/ticket";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    BaseChartDirective,
    NgForOf
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})

export class HomepageComponent {
// Doughnut}
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

  constructor(public dataService: DataService) {
    dataService.restService.loadTickets();
  }

  public getDataFromBackend() : number[] {
    var tickets = this.dataService.getTickets();
    return [tickets.length, tickets.sort(a => a.status = 0).length, 0, 0, this.getTodayTickets(tickets).length];
  }

  public getOpenedTickets(): Ticket[] {
    return this.dataService.getTickets().sort(t => t.status = 0);
  }

  public getForgottenTickets(): Ticket[] {
    let tickets = this.dataService.getTickets();
    var forgottenTickets: Ticket[] = [];
    for (let ticket of tickets) {
      let date = ticket.creationDate?.setMonth(1);
      if (date != undefined && date < Date.now()) {
        forgottenTickets.push(ticket);
      }
    }
    return forgottenTickets;
  }

  public getTodayTickets(tickets: Ticket[]): Ticket[] {
    //var todayTickets: List<Ticket> = new List<Ticket>();
    var todayTickets: Ticket[] = [];
    for (let ticket of tickets) {
      if (ticket.creationDate?.getDate() == Date.now()) {
        todayTickets.push(ticket);
      }
    }
    console.log(todayTickets.length);
    return todayTickets;
  }

}
