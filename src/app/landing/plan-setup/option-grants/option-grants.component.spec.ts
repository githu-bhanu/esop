import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionGrantsComponent } from './option-grants.component';

describe('OptionGrantsComponent', () => {
  let component: OptionGrantsComponent;
  let fixture: ComponentFixture<OptionGrantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionGrantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionGrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
