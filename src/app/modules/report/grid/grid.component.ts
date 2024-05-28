import {
  Component
} from '@angular/core';
import {
  ColDef,
  GridApi,
  GridReadyEvent
} from 'ag-grid-community';
import 'ag-grid-enterprise';
import {
  PAGE_STATE_KEY,
  PaginationEvent,
  ReportDataDTO
} from 'src/app/shared/constants';
import { CustomImage } from 'src/app/shared/custom-cell/custom-image.component';
import { CustomUrl } from 'src/app/shared/custom-cell/custom-url.component';
import { ReportService } from '../services/report.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  reportData: ReportDataDTO[] = [];
  columnDefs: ColDef[] = [
    {
      headerName: 'ID',
      field: 'id',
      cellClass: 'id-class',
      maxWidth: 90,
      filter: 'agTextColumnFilter',
    },
    { headerName: 'Author', field: 'author', filter: 'agTextColumnFilter' },
    { headerName: 'Width', field: 'width', filter: 'agNumberColumnFilter' },
    { headerName: 'Height', field: 'height', filter: 'agNumberColumnFilter' },
    {
      headerName: 'URL',
      field: 'download_url',
      cellRenderer: CustomImage,
      maxWidth: 150,
    },
    {
      headerName: 'Download URL',
      field: 'url',
      cellRenderer: CustomUrl,
      maxWidth: 200,
      filter: 'agTextColumnFilter',
    },
  ];

  paginationPageSize = 15;
  totalPages: number = 0;
  currentPage: number = 1;
  gridApi!: GridApi;

  constructor(private readonly _reportService: ReportService) {}

  /**
   * Sets the current page state in the local storage.
   *
   * This function creates a `PaginationEvent` object with the current page index and page size,
   * and then stores it in the local storage using the `PAGE_STATE_KEY` as the key.
   * The `PaginationEvent` object is serialized to a JSON string before being stored.
   *
   * @return {void} This function does not return a value.
   */
  setCurrentPageState(): void {
    const paginationSize: PaginationEvent = {
      pageIndex: this.currentPage,
      pageSize: this.paginationPageSize,
    };
    localStorage.setItem(PAGE_STATE_KEY, JSON.stringify(paginationSize));
  }

  /**
   * Initializes the grid when it is ready.
   *
   * @param {GridReadyEvent} params - The event object containing the grid API.
   * @return {void} This function does not return anything.
   */
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.loadDataForPage(this.currentPage);
  }

  /**
   * Updates the current page and loads the data for the new page.
   *
   * @param {number} page - The new page number.
   * @return {void} This function does not return anything.
   */
  onPageChanged(page: number): void {
    this.currentPage = page;
    this.loadDataForPage(page);
    this.setCurrentPageState();
  }

  /**
   * Updates the pagination page size, sets the current page state in local storage,
   * and loads the data for the current page.
   *
   * @param {number} pageLimit - The new pagination page size.
   * @return {void} This function does not return anything.
   */
  onPageLimitChanged(pageLimit: number): void {
    this.paginationPageSize = pageLimit;
    this.setCurrentPageState();
    this.loadDataForPage(this.currentPage);
  }

  /**
   * Loads data for a specific page and updates the reportData and totalPages properties.
   *
   * @param {number} page - The page number to load data for.
   * @return {void} This function does not return anything.
   */
  loadDataForPage(page: number) {
    const params = {
      page: page,
      pageSize: this.paginationPageSize,
    };

    this._reportService
      .getData(params.page, params.pageSize)
      .subscribe((data) => {
        this.reportData = data;
        this.totalPages = Math.ceil(200 / this.paginationPageSize);
      });
  }
}
