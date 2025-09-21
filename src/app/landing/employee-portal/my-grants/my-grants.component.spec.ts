import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGrantsComponent } from './my-grants.component';

describe('MyGrantsComponent', () => {
  let component: MyGrantsComponent;
  let fixture: ComponentFixture<MyGrantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyGrantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyGrantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
