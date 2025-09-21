import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyGrantsComponent } from './my-grants/my-grants.component';
import { GrantLettersComponent } from './grant-letters/grant-letters.component';

const routes: Routes = [
  { path: 'my-grants', component: MyGrantsComponent },
  { path: 'grant-letters', component: GrantLettersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeePortalRoutingModule {}
