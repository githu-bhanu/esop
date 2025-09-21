import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CapitalTableRoutingModule } from './capital-table-routing.module';
import { ShareholderMasterComponent } from './shareholder-master/shareholder-master.component';
import { SecuritiesComponent } from './securities/securities.component';
import { OcpsComponent } from './ocps/ocps.component';
import { CcpsComponent } from './ccps/ccps.component';
import { ConvertibleBondsComponent } from './convertible-bonds/convertible-bonds.component';
import { EsopPoolComponent } from './esop-pool/esop-pool.component';
import { BalanceEsopPoolComponent } from './balance-esop-pool/balance-esop-pool.component';


@NgModule({
  declarations: [
    ShareholderMasterComponent,
    SecuritiesComponent,
    OcpsComponent,
    CcpsComponent,
    ConvertibleBondsComponent,
    EsopPoolComponent,
    BalanceEsopPoolComponent
  ],
  imports: [
    CommonModule,
    CapitalTableRoutingModule
  ]
})
export class CapitalTableModule { }
