import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGrantsComponent } from './view-grants.component';

describe('ViewGrantsComponent', () => {
  let component: ViewGrantsComponent;
  let fixture: ComponentFixture<ViewGrantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewGrantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewGrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
