import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcpsComponent } from './ocps.component';

describe('OcpsComponent', () => {
  let component: OcpsComponent;
  let fixture: ComponentFixture<OcpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OcpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
