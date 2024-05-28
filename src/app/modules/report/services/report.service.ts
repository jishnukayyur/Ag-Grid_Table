import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilterModel } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_LIMIT, ReportDataDTO} from 'src/app/shared/constants';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  readonly BaseUrl = environment.baseUrl;
  constructor(
    private readonly _http:HttpClient
  ) { }

  getData(page:number=DEFAULT_PAGE_INDEX,limit:number=DEFAULT_PAGE_LIMIT,filterModel?:FilterModel):Observable<ReportDataDTO[]>{
    return this._http.get<ReportDataDTO[]>(`${this.BaseUrl}list?page=${page}&limit=${limit}`)
    // .pipe(
    //   switchMap((res) => {
    //     return of(
    //       this.filterData(
    //         res,
    //         filterModel || <FilterModel>{}
    //       )
    //     );
    //   }),
    //   tap(res=> console.log('Fss',res))
    // );
  }

  // filterData(response:ReportDataDTO[],filter:FilterModel):ReportDataDTO[]{
  //   const filterdResponse =  response.filter(res => {
  //      let isValid = true;
  //      const item = Object.assign(res);
  //      Object.keys(filter).forEach((key: string) => {
  //        // console.log(filter[key])
  //        const filterItem = filter[key];
  //        if (filterItem.hasOwnProperty('conditions')) {
  //          if (filterItem['operator'] === 'AND') {
  //            isValid =
  //              (item[key] as string).toLowerCase().includes(filterItem['conditions'][0]['filter']) &&
  //              (item[key] as string).toLowerCase().includes(filterItem['conditions'][1]['filter']);
  //          }
  //        }
  //      });
  //      return isValid
  //    })
  //    console.log('filter response',filterdResponse) 
  //    return filterdResponse
  //  }
}
