import { Component } from '@angular/core';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_LIMIT, PAGE_STATE_KEY, PaginationEvent, ReportDataDTO } from 'src/app/shared/constants';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent {
  reportData:ReportDataDTO[]=[];
  paginationData:PaginationEvent = {} as PaginationEvent

  constructor(
    private readonly _reportService: ReportService
  ){}


  ngOnInit(){
    /*
     * Gets the current pagination data from the local storage. 
    */
    this.paginationData = localStorage.getItem(PAGE_STATE_KEY)
      ? JSON.parse(localStorage.getItem(PAGE_STATE_KEY) || '')
      : { pageIndex: DEFAULT_PAGE_INDEX, pageSize: DEFAULT_PAGE_LIMIT };
    /**
     * Loads the report data from the ReportService based on the current pagination data.
     */
    this.getData()
  }

  /**
   * Retrieves data from the report service based on the current pagination data.
   *
   * @return {void} This function does not return a value.
   */
  getData(){
    this._reportService
      .getData(+this.paginationData.pageIndex, +this.paginationData.pageSize)
      .subscribe((res) => (this.reportData = res));
  }

}
