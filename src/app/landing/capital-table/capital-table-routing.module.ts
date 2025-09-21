import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareholderMasterComponent } from './shareholder-master/shareholder-master.component';
import { SecuritiesComponent } from './securities/securities.component';
import { OcpsComponent } from './ocps/ocps.component';
import { CcpsComponent } from './ccps/ccps.component';
import { ConvertibleBondsComponent } from './convertible-bonds/convertible-bonds.component';
import { EsopPoolComponent } from './esop-pool/esop-pool.component';
import { BalanceEsopPoolComponent } from './balance-esop-pool/balance-esop-pool.component';

const routes: Routes = [
  { path: 'shareholder-master', component: ShareholderMasterComponent },
  { path: 'securities', component: SecuritiesComponent },
  { path: 'ocps', component: OcpsComponent },
  { path: 'ccps', component: CcpsComponent },
  { path: 'convertible-bonds', component: ConvertibleBondsComponent },
  { path: 'esop-pool', component: EsopPoolComponent },
  { path: 'balance-esop-pool', component: BalanceEsopPoolComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapitalTableRoutingModule {}
