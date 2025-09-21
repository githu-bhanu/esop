import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportingRoutingModule } from './reporting-routing.module';
import { RiskFreeRateComponent } from './risk-free-rate/risk-free-rate.component';
import { MarketDataComponent } from './market-data/market-data.component';
import { EsopCostComponent } from './esop-cost/esop-cost.component';
import { GrantReportComponent } from './grant-report/grant-report.component';
import { EsopCostPlComponent } from './esop-cost-pl/esop-cost-pl.component';
import { OptionsSummaryReportComponent } from './options-summary-report/options-summary-report.component';
import { OptionsCostReportComponent } from './options-cost-report/options-cost-report.component';
import { ModifiedCostComponent } from './modified-cost/modified-cost.component';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { TestDashReportComponent } from './test-dash-report/test-dash-report.component';


@NgModule({
  declarations: [
    RiskFreeRateComponent,
    MarketDataComponent,
    EsopCostComponent,
    GrantReportComponent,
    EsopCostPlComponent,
    OptionsSummaryReportComponent,
    OptionsCostReportComponent,
    ModifiedCostComponent,
    TransactionReportComponent,
    TestDashReportComponent
  ],
  imports: [
    CommonModule,
    ReportingRoutingModule
  ]
})
export class ReportingModule { }
