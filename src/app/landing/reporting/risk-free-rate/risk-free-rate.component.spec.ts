import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskFreeRateComponent } from './risk-free-rate.component';

describe('RiskFreeRateComponent', () => {
  let component: RiskFreeRateComponent;
  let fixture: ComponentFixture<RiskFreeRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskFreeRateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiskFreeRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
