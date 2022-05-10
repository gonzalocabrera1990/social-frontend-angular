import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { catchError, map } from 'rxjs/operators';
import { Comment, CommentInterface } from '../models/comment.model';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { CommentsSuccess } from '../models/comment-state.model';


@Injectable({
  providedIn: 'root'
})
export class CommServices {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService,
    private store: Store<AppState>,) { }

    postUserModalComment (usersData: CommentInterface): Observable<any> {
      const auth_token = localStorage.getItem('JWT');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
      
      return this.http.post<any>(baseURL + 'comments/angular', usersData ,{
        headers: headers
      })
      .pipe(map(res => {
        this.store.dispatch(new CommentsSuccess(res));
        return res
      })
      ,catchError(error => this.processHTTPMsgService.handleError(error)));

    }
}
