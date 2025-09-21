import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsopCostPlComponent } from './esop-cost-pl.component';

describe('EsopCostPlComponent', () => {
  let component: EsopCostPlComponent;
  let fixture: ComponentFixture<EsopCostPlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsopCostPlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsopCostPlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
