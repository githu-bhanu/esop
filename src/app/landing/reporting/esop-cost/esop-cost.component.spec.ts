import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsopCostComponent } from './esop-cost.component';

describe('EsopCostComponent', () => {
  let component: EsopCostComponent;
  let fixture: ComponentFixture<EsopCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsopCostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsopCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
