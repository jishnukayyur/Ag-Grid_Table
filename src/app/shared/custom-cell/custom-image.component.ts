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
  template: `<img [src]="imageUrl" class="img-fluid object-fit-contain" style="height: 35px;" height=10/>`,
})
export class CustomImage implements ICellRendererAngularComp {
    imageUrl:string='';
    agInit(params: ICellRendererParams): void {
        this.imageUrl = params.value;
    }
  refresh(params: ICellRendererParams) {
    return true;
  }
  buttonClicked() {
    alert("clicked");
  }
}


