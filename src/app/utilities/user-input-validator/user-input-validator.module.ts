import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInputValidatorDirective } from './user-input-validator.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserInputValidatorDirective],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [UserInputValidatorDirective],
})
export class UserInputValidatorModule { }
