import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';
import { SharedModule } from '../shared/shared.module';
import { SimpleTableModule } from '../shared/simple-table/simple-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserInputValidatorModule } from '../utilities/user-input-validator/user-input-validator.module';
import { AgGridModule } from 'ag-grid-angular';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { NgSelectModule } from '@ng-select/ng-select';
import { UserTablesComponent } from './user-tables/user-tables.component';
import { ConfigUserRoleComponent } from './config-user-role/config-user-role.component';

@NgModule({
  declarations: [
    LandingComponent,
    UserTablesComponent,
    ConfigUserRoleComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule,
    SimpleTableModule,
    FormsModule,
    ReactiveFormsModule,
    UserInputValidatorModule,
    AgGridModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule
  ],
  exports: [
    LandingComponent,
  ]
})
export class LandingModule { }
