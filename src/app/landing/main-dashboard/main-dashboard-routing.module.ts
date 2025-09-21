import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../guards/auth.guard';
import { MainDashboardComponent } from './main-dashboard.component';
import { VisualizeComponent } from './visualize/visualize.component';
// import { CanDeactivateGuard } from '../../services/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '', component: MainDashboardComponent, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: VisualizeComponent, data: {page: 'dashboard'}, canActivate: [AuthGuard] },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainDashboardRoutingModule { }
