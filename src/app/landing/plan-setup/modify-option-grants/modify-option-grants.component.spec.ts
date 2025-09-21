import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyOptionGrantsComponent } from './modify-option-grants.component';

describe('ModifyOptionGrantsComponent', () => {
  let component: ModifyOptionGrantsComponent;
  let fixture: ComponentFixture<ModifyOptionGrantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyOptionGrantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyOptionGrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
