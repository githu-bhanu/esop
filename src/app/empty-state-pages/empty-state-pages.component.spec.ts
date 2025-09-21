import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyStatePagesComponent } from './empty-state-pages.component';

describe('EmptyStatePagesComponent', () => {
  let component: EmptyStatePagesComponent;
  let fixture: ComponentFixture<EmptyStatePagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyStatePagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyStatePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
