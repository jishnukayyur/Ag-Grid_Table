import { AfterViewInit, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ColDef, GridReadyEvent, IServerSideDatasource, PaginationChangedEvent, PaginationNumberFormatterParams } from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_LIMIT, PAGE_STATE_KEY, PaginationEvent, ReportDataDTO } from 'src/app/shared/constants';
import { ReportService } from '../services/report.service';
import {  CustomImage } from 'src/app/shared/custom-cell/custom-image.component';
import { CustomUrl } from 'src/app/shared/custom-cell/custom-url.component';
import { BehaviorSubject, Observable, Subject, debounceTime, filter, switchMap } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @ViewChild('agGridRef') agGridRef!: AgGridAngular;
  reportData: ReportDataDTO[] = [];

  columnDefs: ColDef[] = [
    { headerName: 'ID', field: 'id',cellClass:'id-class',maxWidth: 90 },
    { headerName: 'Author', field: 'author' },
    { headerName: 'Width', field: 'width' },
    { headerName: 'Height', field: 'height' },
    { headerName: 'URL', field: 'download_url', cellRenderer: CustomImage,maxWidth: 150 },
    { headerName: 'Download URL', field: 'url', cellRenderer: CustomUrl,maxWidth: 200 },
  ];
  public paginationPageSize = 15;
  public paginationPageSizeSelector: number[] | boolean = [15, 30];
  reportDataGet$ = new BehaviorSubject<PaginationChangedEvent>(
    <PaginationChangedEvent>{}
  );

  constructor(private readonly _reportService: ReportService) {}

  ngOnInit() {
    this.getData()
  }


  getData(){
    this.reportDataGet$.pipe(
      debounceTime(1000),
      switchMap((res) =>
        this._reportService.getData(
          res.api?.paginationGetCurrentPage()|| DEFAULT_PAGE_INDEX,
          res.api?.paginationGetPageSize() || DEFAULT_PAGE_LIMIT
        )
      )
    ).subscribe(res=> this.reportData = res);
  }

  onPaginationChanged(event: PaginationChangedEvent): void {

    this.setCurrentPageState(
      event.api?.paginationGetPageSize() || DEFAULT_PAGE_LIMIT,
      event.api?.paginationGetCurrentPage() || DEFAULT_PAGE_INDEX
    );

    if(event.newPage ||event.newPageSize){
      this.reportDataGet$.next(event);
    }
  }
  
  setCurrentPageState(pageSize:number,pageIndex:number):void{
    const paginationSize:PaginationEvent = {
      pageIndex:pageIndex,
      pageSize:pageSize
    }
    localStorage.setItem(PAGE_STATE_KEY,JSON.stringify(paginationSize))
  }
}
