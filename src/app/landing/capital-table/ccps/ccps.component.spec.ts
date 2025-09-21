import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcpsComponent } from './ccps.component';

describe('CcpsComponent', () => {
  let component: CcpsComponent;
  let fixture: ComponentFixture<CcpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CcpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CcpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
