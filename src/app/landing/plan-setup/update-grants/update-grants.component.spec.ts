import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGrantsComponent } from './update-grants.component';

describe('UpdateGrantsComponent', () => {
  let component: UpdateGrantsComponent;
  let fixture: ComponentFixture<UpdateGrantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateGrantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateGrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
