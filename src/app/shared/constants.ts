export interface ReportDataDTO {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export const DEFAULT_PAGE_INDEX=1;
export const DEFAULT_PAGE_LIMIT=15;

export const PAGE_STATE_KEY = 'current-page'

export interface PaginationEvent {
    pageIndex:number|string,
    pageSize:number|string
}