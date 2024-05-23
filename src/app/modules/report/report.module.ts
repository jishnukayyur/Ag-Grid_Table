import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { GridComponent } from './grid/grid.component';
import { GalleryComponent } from './gallery/gallery.component';


@NgModule({
  declarations: [
    ReportComponent,
    GridComponent,
    GalleryComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    AgGridModule,
    HttpClientModule
  ]
})
export class ReportModule { }
