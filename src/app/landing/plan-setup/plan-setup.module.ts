import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanSetupRoutingModule } from './plan-setup-routing.module';
import { ViewGrantsComponent } from './view-grants/view-grants.component';
import { OptionGrantsComponent } from './option-grants/option-grants.component';
import { GenerateReportsComponent } from './generate-reports/generate-reports.component';
import { OptionsLapseOrForfeitedComponent } from './options-lapse-or-forfeited/options-lapse-or-forfeited.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { UpdateGrantsComponent } from './update-grants/update-grants.component';
import { ModifyOptionGrantsComponent } from './modify-option-grants/modify-option-grants.component';


@NgModule({
  declarations: [
    ViewGrantsComponent,
    OptionGrantsComponent,
    GenerateReportsComponent,
    OptionsLapseOrForfeitedComponent,
    ExerciseComponent,
    UpdateGrantsComponent,
    ModifyOptionGrantsComponent
  ],
  imports: [
    CommonModule,
    PlanSetupRoutingModule
  ]
})
export class PlanSetupModule { }
