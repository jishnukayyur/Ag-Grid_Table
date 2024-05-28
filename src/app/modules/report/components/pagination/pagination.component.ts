import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  @Input() totalPages: number = 0;
  @Input() selectedPageLimit: number = 15;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() pageLimitChanged: EventEmitter<number> = new EventEmitter<number>();

  currentPage: number = 1;
  pageLimitOptions: number[] = [15, 30, 40, 50];
  
  constructor() {}

  /**
   * Sets the current page to the first page and emits an event with the updated current page.
   *
   * @return {void} 
   */
  onFirstPage() {
    this.currentPage = 1;
    this.pageChanged.emit(this.currentPage);
  }

  /**
   * Decrements the current page number and emits an event with the updated current page if the current page is greater than 1.
   *
   * @return {void} This function does not return a value.
   */
  onPrevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged.emit(this.currentPage);
    }
  }

  /**
   * Increments the current page number and emits an event with the updated current page if the current page is less than the total number of pages.
   *
   * @return {void} This function does not return a value.
   */
  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChanged.emit(this.currentPage);
    }
  }

  /**
   * Sets the current page to the last page and emits an event with the updated current page.
   *
   * @return {void} 
   */
  onLastPage() {
    this.currentPage = this.totalPages;
    this.pageChanged.emit(this.currentPage);
  }

  /**
   * Emits an event with the updated page limit when the page limit is changed.
   *
   * @return {void} This function does not return a value.
   */
  onPageLimitChange() {
    this.pageLimitChanged.emit(this.selectedPageLimit);
  }
}
