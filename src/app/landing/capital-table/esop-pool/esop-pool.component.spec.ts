import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsopPoolComponent } from './esop-pool.component';

describe('EsopPoolComponent', () => {
  let component: EsopPoolComponent;
  let fixture: ComponentFixture<EsopPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EsopPoolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsopPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
