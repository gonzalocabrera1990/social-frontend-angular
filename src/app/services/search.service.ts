import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { baseURL } from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService ) { }

  handleSearch(search:string): Observable<User[]> {
    const auth_token = localStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })

  return this.http.get<any>(baseURL + `search/search?q=${search}`, {
    headers: headers
  })
  .pipe(map(res => {
    return res
  }),
    catchError(error => this.processHTTPMsgService.handleError(error)));
}
}
