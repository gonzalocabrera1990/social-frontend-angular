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
export class CommentsService {

  constructor(private http: HttpClient,
    private processHTTPMsgService: ProcessHTTPMsgService,
    private store: Store<AppState>,) { }

    postUserModalComment (usersData: CommentInterface): Observable<any> {
      const auth_token = localStorage.getItem('JWT');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
      
      return this.http.post<any>(baseURL + 'comments/angular-post-comment', usersData ,{
        headers: headers
      })
      .pipe(map(res => {
        this.store.dispatch(new CommentsSuccess(res));
        return res
      })
      ,catchError(error => this.processHTTPMsgService.handleError(error)));

    }
    getComment (ID: string): Observable<Comment[]> {
      const auth_token = localStorage.getItem('JWT');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
      
      return this.http.get<any>(baseURL + 'comments/get-comments-image/' + ID ,{
        headers: headers
      })
      .pipe(map(res => {
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));

    }
    postComment (usersData: CommentInterface): Observable<Comment> {
      const auth_token = localStorage.getItem('JWT');
      const headers = new HttpHeaders({
        'Method': "POST",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
      
      return this.http.post<any>(baseURL + 'comments/post-comment', usersData ,{
        headers: headers
      })
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));

    }
 
    postDeleteComment (commId: string): Observable<Comment> {
      const auth_token = localStorage.getItem('JWT');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
      
      return this.http.delete<any>(baseURL + 'comments/delete-comment-image/' + commId,{
        headers: headers
      })
      .pipe(map(res => {
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));

    }
}
