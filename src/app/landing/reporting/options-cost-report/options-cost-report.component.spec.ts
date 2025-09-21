import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsCostReportComponent } from './options-cost-report.component';

describe('OptionsCostReportComponent', () => {
  let component: OptionsCostReportComponent;
  let fixture: ComponentFixture<OptionsCostReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsCostReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsCostReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
