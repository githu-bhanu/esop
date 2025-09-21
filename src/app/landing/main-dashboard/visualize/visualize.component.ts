import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'esop-visualize',
  templateUrl: './visualize.component.html',
  styleUrls: ['./visualize.component.scss']
})
export class VisualizeComponent implements OnInit {

  public monthlySalesChartOptions: any = {
    legend: {
      data: ['Monthly Sales']
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Monthly Sales',
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };
  
  public monthlyTemperatureChartOptions: any = {
    legend: {
      data: ['Monthly Temperature']
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Monthly Temperature',
        data: [5, 10, 18, 25, 30, 28, 22],
        type: 'line'
      }
    ]
  };
  
  constructor() { }

  ngOnInit(): void {
  }

}
