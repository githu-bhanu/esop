import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'kl-auto-refresh',
  templateUrl: './auto-refresh.component.html'
})
export class AutoRefreshComponent implements OnInit, OnDestroy {
  @Input() action_interval;
  @Input() clearChildInterval;
  @Output() refreshEmitter = new EventEmitter();
  public autoRefreshInterval: any;
  public metaData: any = {
    auto_refresh_duration: null,
  };
  // Standard format data to be passed to this component
  // public interval: any = {
  //   action: 'auto_refresh',
  //   label: 'Refresh',
  //   type: 'auto_refresh',
  //   intervals: [
  //     {
  //       label: 'Off',
  //       value: 0,
  //     },
  //     {
  //       label: '10s',
  //       value: 10,
  //     },
  //     {
  //       label: '1m',
  //       value: 60,
  //     },
  //     {
  //       label: '2m',
  //       value: 120,
  //     },
  //     {
  //       label: '5m',
  //       value: 300,
  //     },
  //   ],
  // };
  public defaultIntervals: any = [
    {
      label: 'Off',
      value: 0,
    },
    {
      label: '10s',
      value: 10,
    },
    {
      label: '1m',
      value: 60,
    },
    {
      label: '2m',
      value: 120,
    },
    {
      label: '5m',
      value: 300,
    },
  ];

  ngOnInit() {
    if (!this.action_interval.hasOwnProperty('intervals')) {
      this.action_interval['intervals'] = this.defaultIntervals;
      this.action_interval = { ...this.action_interval };
    }
    if (this.action_interval && this.action_interval['default_duration']) {
      this.metaData['auto_refresh_duration'] = this.action_interval['default_duration'];
    } else {
      this.metaData['auto_refresh_duration'] = 0;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clearChildInterval'] && changes['clearChildInterval']['previousValue'] !== changes['clearChildInterval']['currentValue']) {
      this.metaData['auto_refresh_duration'] = 0;
      this.removeRefreshInterval();
    }
  }

  removeRefreshInterval() {
    try {
      if (this.autoRefreshInterval) {
        clearInterval(this.autoRefreshInterval);
        this.autoRefreshInterval = null;
      }
    } catch (intervalErr) {
      console.error(intervalErr);
    }
  }
  onChangeInTimeRange(event, each_action) {
    try {
      if (this.metaData['auto_refresh_duration']) {
        if (this.autoRefreshInterval) {
          this.removeRefreshInterval();
        }
        this.autoRefreshInterval = setInterval(() => {
          this.emitAction(each_action);
        },                                     (event * 1000));
      } else {
        if (this.autoRefreshInterval) {
          this.removeRefreshInterval();
        }
        return;
      }
    } catch (err) {
      console.error(err);
    }
  }
  emitAction(data) {
    try {
      if (data) {
        this.refreshEmitter.emit(data);
      }
    } catch (refreshEmitErr) {
      console.error(refreshEmitErr);
    }
  }
  ngOnDestroy(): void {
    this.metaData['auto_refresh_duration'] = 0;
    this.removeRefreshInterval();
  }

}
