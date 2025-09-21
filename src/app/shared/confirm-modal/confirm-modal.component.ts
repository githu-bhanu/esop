import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AppService } from '../../../app/services/app.service';
import { Config } from '../../config/config';

@Component({
  selector: 'esop-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  public message: any;
  subject: Subject<boolean>;
  constructor(public bsModalRef: BsModalRef, public appService : AppService) { 
    this.message = Config?.ALERT_MESSAGES?.['CONFIRM_ALART_MESSAGE']
  }

  ngOnInit() {
  }
  action(value: boolean) {
    this.bsModalRef.hide();
    this.subject.next(value);
    this.subject.complete();
    if (!value) {
      this.appService.headerTab.next(value);
    } else{
      this.appService.headerTab.next(value);
    }
  }
}
