import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsSummaryReportComponent } from './options-summary-report.component';

describe('OptionsSummaryReportComponent', () => {
  let component: OptionsSummaryReportComponent;
  let fixture: ComponentFixture<OptionsSummaryReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsSummaryReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsSummaryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
