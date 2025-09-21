import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserMasterComponent } from './update-user-master.component';

describe('UpdateUserMasterComponent', () => {
  let component: UpdateUserMasterComponent;
  let fixture: ComponentFixture<UpdateUserMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
