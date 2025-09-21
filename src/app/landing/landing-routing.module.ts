import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { LandingComponent } from './landing.component';
import { UserTablesComponent } from './user-tables/user-tables.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent, children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      {
        path: '',
        loadChildren: () => import('./main-dashboard/main-dashboard.module').then(m => m.MainDashboardModule),
      },
      {
        path: 'capital-table',
        loadChildren: () => import('./capital-table/capital-table.module').then(m => m.CapitalTableModule)
      },
      {
        path: 'plan-setup',
        loadChildren: () => import('./plan-setup/plan-setup.module').then(m => m.PlanSetupModule)
      },
      {
        path: 'administration',
        loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule)
      },
      {
        path: 'reporting',
        loadChildren: () => import('./reporting/reporting.module').then(m => m.ReportingModule)
      },
      {
        path: 'employee-portal',
        loadChildren: () => import('./employee-portal/employee-portal.module').then(m => m.EmployeePortalModule)
      } , 
       {
        path: 'user-table/:type',
        component: UserTablesComponent
      }   
      // {
      //   path: 'user-mt',
      //   loadChildren: () => import('./user-management/user-management.module').then(m => m.UserManagementModule)
      // }
      // {
      //   path: 'projects',
      //   loadChildren: () => import('./project-management/project-management.module').then(m => m.ProjectManagementModule),
      //   data: { page: 'project_info' },
      //   canActivate: [AuthGuard]
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
