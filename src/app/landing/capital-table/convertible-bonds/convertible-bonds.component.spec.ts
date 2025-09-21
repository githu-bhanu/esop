import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertibleBondsComponent } from './convertible-bonds.component';

describe('ConvertibleBondsComponent', () => {
  let component: ConvertibleBondsComponent;
  let fixture: ComponentFixture<ConvertibleBondsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertibleBondsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvertibleBondsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
