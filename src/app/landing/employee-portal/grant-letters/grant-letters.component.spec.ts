import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantLettersComponent } from './grant-letters.component';

describe('GrantLettersComponent', () => {
  let component: GrantLettersComponent;
  let fixture: ComponentFixture<GrantLettersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrantLettersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrantLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
