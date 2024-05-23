// NOTE: Angular CLI does not support component CSS imports: angular-cli/issues/23273

import { Component } from '@angular/core';
// NOTE: Angular CLI does not support component CSS imports: angular-cli/issues/23273
// import '@ag-grid-community/styles/ag-grid.css';
// import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ModuleRegistry, ClientSideRowModelModule, ICellRendererParams } from 'ag-grid-community';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

@Component({
  standalone: true,
  template: `
  <a [href]="downloadUrl" target="_blank" class="w-100">{{downloadUrl}}</a>`,
})
export class CustomUrl implements ICellRendererAngularComp {
    downloadUrl:string='';
    agInit(params: ICellRendererParams): void {
        this.downloadUrl = params.value;
    }
  refresh(params: ICellRendererParams) {
    return true;
  }
  buttonClicked() {
    alert("clicked");
  }
}


