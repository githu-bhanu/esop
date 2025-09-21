import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ucp-inputfield-renderer',
  templateUrl: './inputfield-renderer.component.html',
  styleUrls: ['./inputfield-renderer.component.scss']
})
export class InputfieldRendererComponent implements ICellRendererAngularComp {

  public params;
  public hidden: boolean = false;
  public settings: any = {};

  agInit(params): void {
    this.params = params;
    this.settings = this.params.settings;

    if (params.hidden instanceof Function) {
      this.hidden = params.hidden({ data: params.node.data });
    }
  }
  
  refresh(params?: any): boolean {
    return true;
  }

}
