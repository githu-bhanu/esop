import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiedCostComponent } from './modified-cost.component';

describe('ModifiedCostComponent', () => {
  let component: ModifiedCostComponent;
  let fixture: ComponentFixture<ModifiedCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiedCostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiedCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
