import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { UpdateEmployeeMasterComponent } from './update-employee-master/update-employee-master.component';
import { UpdateUserMasterComponent } from './update-user-master/update-user-master.component';
import { GrantLettersComponent } from './grant-letters/grant-letters.component';


@NgModule({
  declarations: [
    EmployeeMasterComponent,
    UpdateEmployeeMasterComponent,
    UpdateUserMasterComponent,
    GrantLettersComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
