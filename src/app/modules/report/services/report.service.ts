import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_LIMIT, ReportDataDTO } from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  readonly BaseUrl = environment.baseUrl;

  constructor(
    private readonly _http:HttpClient
  ) { }

  getData(page:number=DEFAULT_PAGE_INDEX,limit:number=DEFAULT_PAGE_LIMIT):Observable<ReportDataDTO[]>{
    return this._http.get<ReportDataDTO[]>(`${this.BaseUrl}list?page=${page}&limit=${limit}`);
  }

}
