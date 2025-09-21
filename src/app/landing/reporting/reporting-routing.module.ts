import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: 'risk-free-rate', component: RiskFreeRateComponent },
  { path: 'market-data', component: MarketDataComponent },
  { path: 'esop-cost', component: EsopCostComponent },
  { path: 'grant-report', component: GrantReportComponent },
  { path: 'esop-cost-pl', component: EsopCostPlComponent },
  { path: 'options-summary-report', component: OptionsSummaryReportComponent },
  { path: 'options-cost-report', component: OptionsCostReportComponent },
  { path: 'modified-cost', component: ModifiedCostComponent },
  { path: 'transaction-report', component: TransactionReportComponent },
  { path: 'test-dash-report', component: TestDashReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportingRoutingModule {}
