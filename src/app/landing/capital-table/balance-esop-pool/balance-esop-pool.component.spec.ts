import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceEsopPoolComponent } from './balance-esop-pool.component';

describe('BalanceEsopPoolComponent', () => {
  let component: BalanceEsopPoolComponent;
  let fixture: ComponentFixture<BalanceEsopPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BalanceEsopPoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BalanceEsopPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
