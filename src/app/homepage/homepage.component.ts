import { Component } from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {ChartConfiguration} from 'chart.js';
import { Ticket } from "../rest-objects/ticket";
import {NgForOf} from "@angular/common";
import {DataService} from "../services/data-service";

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
  public tickets: Ticket[];
  protected totalTickets: number = 0;
  protected openedTickets: number = 0;
  protected todayTickets: number = 0;
  protected nonAppendTickets: number = 0;
  public doughnutChartLabels: string[] = [ "Offene Tickets", "Überfällige Tickets", "Nicht zugewiesen", "Tickets für Heute", "Markierte Tickets" ];
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
    this.tickets = this.dataService.tickets;
    this.totalTickets = this.tickets.length;
    this.openedTickets = this.totalTickets - this.tickets.sort(a => a.status = 0).length;
    //this.nonAppendTickets = this.totalTickets - this.tickets.sort(a => a.app).length;
    //this.todayTickets = this.totalTickets - this.tickets.sort(a => a.crea).length;
  }

  public percentageToString(percentage:number):string {
    return percentage + "%";
  }

  public getDataFromBackend() : number[] {
    return [24, 20, 12, 10, 4];
  }

  public getAllTickets(): Ticket[] {
    var ticketOne = new Ticket();
    ticketOne.title = "Sample first ticket";

    var ticketTwo = new Ticket();
    ticketOne.title = "Sample second ticket";

    var ticketThree = new Ticket();
    ticketOne.title = "Sample third ticket";

    return [ticketOne, ticketTwo, ticketThree];
  }

}
