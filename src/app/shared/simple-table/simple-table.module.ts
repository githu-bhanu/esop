import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleTableWithPaginationComponent } from './simple-table-with-pagination/simple-table-with-pagination.component';
import { FilterTablePipe, DateTransFormPipe } from './simple-table-with-pagination/filter-table.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgbPopoverModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
// import { UtilityComponentsModule } from '../utility-components/utility-components.module';
import { UnescapePipe } from './unescape.pipe';
import { UserInputValidatorModule } from 'src/app/utilities/user-input-validator/user-input-validator.module';
import { DatePickerModule } from '../date-picker/date-picker.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SimpleTableWithPaginationComponent,
    FilterTablePipe,
    DateTransFormPipe,
    UnescapePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DatePickerModule,
    NgSelectModule,
    ScrollingModule,
    InfiniteScrollModule,
    NgbTooltipModule,
    NgbPopoverModule,
    // UtilityComponentsModule,
    UserInputValidatorModule,
  ],
  exports: [
    SimpleTableWithPaginationComponent,
    FilterTablePipe,
    DateTransFormPipe,
  ]
})
export class SimpleTableModule { }
