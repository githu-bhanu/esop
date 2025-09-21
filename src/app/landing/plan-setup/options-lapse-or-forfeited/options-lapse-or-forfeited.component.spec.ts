import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsLapseOrForfeitedComponent } from './options-lapse-or-forfeited.component';

describe('OptionsLapseOrForfeitedComponent', () => {
  let component: OptionsLapseOrForfeitedComponent;
  let fixture: ComponentFixture<OptionsLapseOrForfeitedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsLapseOrForfeitedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsLapseOrForfeitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
