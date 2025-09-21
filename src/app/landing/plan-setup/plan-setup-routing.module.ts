import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewGrantsComponent } from './view-grants/view-grants.component';
import { OptionGrantsComponent } from './option-grants/option-grants.component';
import { GenerateReportsComponent } from './generate-reports/generate-reports.component';
import { OptionsLapseOrForfeitedComponent } from './options-lapse-or-forfeited/options-lapse-or-forfeited.component';
import { ExerciseComponent } from './exercise/exercise.component';
import { UpdateGrantsComponent } from './update-grants/update-grants.component';
import { ModifyOptionGrantsComponent } from './modify-option-grants/modify-option-grants.component';

const routes: Routes = [
  { path: 'view-grants', component: ViewGrantsComponent },
  { path: 'option-grants', component: OptionGrantsComponent },
  { path: 'generate-reports', component: GenerateReportsComponent },
  { path: 'options-lapse-or-forfeited', component: OptionsLapseOrForfeitedComponent },
  { path: 'exercise', component: ExerciseComponent },
  { path: 'update-grants', component: UpdateGrantsComponent },
  { path: 'modify-option-grants', component: ModifyOptionGrantsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlanSetupRoutingModule {}
