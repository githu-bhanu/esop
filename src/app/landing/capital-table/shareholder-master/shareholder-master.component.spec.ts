import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareholderMasterComponent } from './shareholder-master.component';

describe('ShareholderMasterComponent', () => {
  let component: ShareholderMasterComponent;
  let fixture: ComponentFixture<ShareholderMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareholderMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShareholderMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
