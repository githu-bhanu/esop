import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ToasterService } from './toastr/toaster.service';
import { TreeModule } from '@circlon/angular-tree-component';
import { CommonPopupComponent } from './common-popup/common-popup.component';
import { NgSelectModule } from '@ng-select/ng-select';
// import { TagInputModule } from 'ngx-chips';
import { OwlDateTimeModule, OwlNativeDateTimeModule, DateTimeAdapter, OWL_DATE_TIME_FORMATS, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { MomentDateTimeAdapter } from 'ng-pick-datetime/date-time/adapter/moment-adapter/moment-date-time-adapter.class';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonPopupService } from './common-popup/common-popup.service';
import { ModalComponent } from './modal/modal.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HashDirective } from './hash.directive';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MultiRangeSliderComponent } from './multi-range-slider/multi-range-slider.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { GlobalSliderModule } from '../utilities/global-slider/global-slider.module';
import { NoWhiteSpaceValidatorModule } from '../utilities/no-white-space-validator/no-white-space-validator.module';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { VisualChartsComponent } from './visual-charts/visual-charts.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { SimpleTableModule } from './simple-table/simple-table.module';
import { AutoRefreshComponent } from './auto-refresh/auto-refresh.component';
import { DatePickerModule } from './date-picker/date-picker.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { LeftSideBarComponent } from './left-side-bar/left-side-bar.component';
import { AgGridTableComponent } from './ag-grid-table/ag-grid-table.component';
import { BtnCellRendererComponent } from './btn-cell-renderer/btn-cell-renderer.component';
import { InputfieldRendererComponent } from './inputfield-renderer/inputfield-renderer.component';
import { SelectRendererComponent } from './select-renderer/select-renderer.component';
import { SwitchInputBtnCellRendererComponent } from './switch-input-btn-cell-renderer/switch-input-btn-cell-renderer.component';
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import { AgGridModule } from '@ag-grid-community/angular';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { TreeViewComponent } from './tree-view/tree-view.component';
@NgModule({
  declarations: [
    CommonPopupComponent,
    ModalComponent,
    HashDirective,
    MultiRangeSliderComponent,
    VisualChartsComponent,
    ConfirmModalComponent,
    AutoRefreshComponent,
    HeaderComponent,
    SidebarComponent,
    ComingSoonComponent,
    LeftSideBarComponent,
    AgGridTableComponent,
    BtnCellRendererComponent,
    InputfieldRendererComponent,
    SelectRendererComponent,
    SwitchInputBtnCellRendererComponent,
    TreeViewComponent,
  ],
  imports: [
    InfiniteScrollModule,
    NgxSliderModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule, 
    GlobalSliderModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      closeButton: false
    }),
    TreeModule,
    NgSelectModule,
    // TagInputModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    // NgbModule,
    NoWhiteSpaceValidatorModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
    PopoverModule.forRoot(),
    SimpleTableModule,
    DatePickerModule,
    AgGridModule
  ],
  exports: [
    CommonPopupComponent,
    ModalComponent,
    VisualChartsComponent,
    HeaderComponent,
    SidebarComponent,
    ComingSoonComponent,
    LeftSideBarComponent,
    AgGridTableComponent,
    TreeViewComponent
  ],
  providers: [ToastrService, ToasterService, CommonPopupService,
    { provide: DateTimeAdapter, useClass: MomentDateTimeAdapter, deps: [OWL_DATE_TIME_LOCALE] },
    {
      provide: OWL_DATE_TIME_FORMATS,
      useValue: {
        fullPickerInput: 'D MMM, YYYY, HH:mm',
        parseInput: 'D MMM, YYYY, HH:mm',
        datePickerInput: 'D MMM, YYYY',
        timePickerInput: 'LT',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY',
      }
    },
  ],
})
export class SharedModule {
  constructor() {
    const modules = [
      ClientSideRowModelModule,
      CsvExportModule,
      InfiniteRowModelModule
    ];
    ModuleRegistry.registerModules(modules);
  }
}
