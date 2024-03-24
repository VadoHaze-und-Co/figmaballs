import { Component } from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    BaseChartDirective
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  data : string[] = ["103","20","10","12","24"];
// Doughnut
  public doughnutChartLabels: string[] = [ 'Warteschlange', "Überfällige Tickets", "Tickets für Heute", "offene Tickets", "Nicht zugewiesen" ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [ 103, 20, 10, 12, 24 ], label: 'Tickets' }
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
            return currentValue + " (" + percentage + "%)";
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

  constructor() {
  }
}
