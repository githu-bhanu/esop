import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeePortalRoutingModule } from './employee-portal-routing.module';
import { MyGrantsComponent } from './my-grants/my-grants.component';
import { GrantLettersComponent } from './grant-letters/grant-letters.component';


@NgModule({
  declarations: [
    MyGrantsComponent,
    GrantLettersComponent
  ],
  imports: [
    CommonModule,
    EmployeePortalRoutingModule
  ]
})
export class EmployeePortalModule { }
