import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { GridComponent } from './grid/grid.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, LucideAngularModule } from 'lucide-angular';


@NgModule({
  declarations: [
    ReportComponent,
    GridComponent,
    GalleryComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    AgGridModule,
    HttpClientModule,
    FormsModule,
    LucideAngularModule.pick({ ChevronRight,ChevronLast, ChevronFirst, ChevronLeft })
  ]
})
export class ReportModule { }
