import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeMasterComponent } from './employee-master/employee-master.component';
import { UpdateEmployeeMasterComponent } from './update-employee-master/update-employee-master.component';
import { UpdateUserMasterComponent } from './update-user-master/update-user-master.component';
import { GrantLettersComponent } from './grant-letters/grant-letters.component';

const routes: Routes = [
  { path: 'employee-master', component: EmployeeMasterComponent },
  { path: 'update-employee-master', component: UpdateEmployeeMasterComponent },
  { path: 'update-user-master', component: UpdateUserMasterComponent },
  { path: 'grant-letters', component: GrantLettersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule {}
