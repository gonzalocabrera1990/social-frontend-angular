import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Content } from './../models/content.model';
import { ContentRequest, ContentSuccess } from '../models/content-state.model'


@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient,
    private store: Store<AppState>,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

  getTheStartWall(): Observable<Content[]> {
    this.store.dispatch(new ContentRequest());
    const id = localStorage.getItem('ID')
    return this.http.get<Content[]>(baseURL + 'start/publications/' + id)
      .pipe(map(res => {
        this.store.dispatch(new ContentSuccess(res));
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));

  }

  sendData() {
    this.getTheStartWall()
      .subscribe(res => {
        this.store.dispatch(new ContentSuccess(res));
      })
  }

}
