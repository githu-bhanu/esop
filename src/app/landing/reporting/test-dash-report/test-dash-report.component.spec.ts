import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestDashReportComponent } from './test-dash-report.component';

describe('TestDashReportComponent', () => {
  let component: TestDashReportComponent;
  let fixture: ComponentFixture<TestDashReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestDashReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestDashReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
