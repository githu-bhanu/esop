import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'esop-visual-charts',
  templateUrl: './visual-charts.component.html',
  styleUrls: ['./visual-charts.component.scss']
})
export class VisualChartsComponent implements OnInit {

  @Input() uniqueId: any;
  @Input() chartOptions: any;
  @Output() typeEmitter = new EventEmitter();
  @Output() mouseOverEmitter = new EventEmitter();
  @Output() mouseOutEmitter = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    // if (this.chartOptions?.tooltip && this.chartOptions?.series?.[0]?.type === "scatter") {
    //   this.chartOptions['tooltip']['trigger'] = 'item';
    // }
    // else if (this.chartOptions?.tooltip) {
    //   this.chartOptions['tooltip']['trigger'] = 'axis';
    // }
    this.chartOptions = {...this.chartOptions}
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartOptions']) {
      // if (this.chartOptions?.tooltip && this.chartOptions?.series?.[0]?.type === "scatter") {
      //   this.chartOptions['tooltip']['trigger'] = 'item';
      // }
      // else if (this.chartOptions?.tooltip) {
      //   this.chartOptions['tooltip']['trigger'] = 'axis';
      // }
      this.chartOptions = {...this.chartOptions}
    }
  }

  public chartInstance: any;
  initChart(event) {
    this.chartInstance = event;
    return;
    this.chartInstance.on('magictypechanged', (params) => {
      if (params?.currentType) {
        this.typeEmitter.emit({chartType: params?.currentType || 'line'});
      }
    });
    var zr = this.chartInstance.getZr();
    zr.on('mousemove', (params) => {
      if (!this.chartInstance && this.chartOptions?.series?.[0]?.type === 'scatter') {
        return;
      }
      const pos = [params.event.zrX, params.event.zrY];
      const tmp = this.chartInstance.convertFromPixel({ gridIndex: 0 }, pos);
      const xVal = parseFloat(tmp[0].toFixed(1));
      if (params) {
        const XcordData: any = this?.chartOptions?.series?.[0]?.data?.map((ele: any) => ele[0]);
        const nearest = XcordData.reduce((a, b) => {
          return Math.abs(b - xVal) < Math.abs(a - xVal) ? b : a;
        });
        this.mouseOverEmitter.emit({data: [xVal], nearestData: nearest});
      }
    });
    zr.on('globalout', (params) => {
      if (!this.chartInstance && this.chartOptions?.series?.[0]?.type === 'scatter') {
        return;
      }
      const pos = [params.event.zrX, params.event.zrY];
      const tmp = this.chartInstance.convertFromPixel({ gridIndex: 0 }, pos);
      const xVal = parseFloat(tmp[0].toFixed(1));
      if (params) {
        const XcordData: any = this?.chartOptions?.series?.[0]?.data?.map((ele: any) => ele[0]);
        const nearest = XcordData.reduce((a, b) => {
          return Math.abs(b - xVal) < Math.abs(a - xVal) ? b : a;
        });
        this.mouseOutEmitter.emit({data: [xVal], nearestData: nearest});
      }
    });
    this.chartInstance.on('mouseover', (params) => {
      if (params) {
        this.mouseOverEmitter.emit({data: params?.data});
      }
    });

    // this.chartInstance.on('mouseout', (params) => {
    //   if (params) {
    //     this.mouseOutEmitter.emit({data: params?.data});
    //   }
    // });
  }
}
