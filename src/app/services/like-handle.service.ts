import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Likes } from '../models/likes.model';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { LikesRequest, LikesSuccess } from '../models/likes-state.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LikeHandleService {

  constructor(private http: HttpClient,
    private store: Store<AppState>,
    private processHTTPMsgService: ProcessHTTPMsgService) { }

    postLike (usersData): Observable<Likes> {
      var DATA = {
        id: usersData.id,
        liked: usersData.liked
      }
      
      const auth_token = localStorage.getItem('JWT');
      const headers = new HttpHeaders({
        'Method': "POST",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
      return this.http.post<any>(baseURL + 'likes/angular-post-i-like-it/' , JSON.stringify(DATA) ,{
        headers: headers
      })
      .pipe(map(res => {
        this.store.dispatch(new LikesSuccess(res));
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
    }
    postLikeVideo (usersData): Observable<Likes> {
      
      var DATA = {
        id: usersData.id,
        liked: usersData.liked
      }

      const auth_token = localStorage.getItem('JWT');
      const headers = new HttpHeaders({
        'Method': "POST",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
      return this.http.post<any>(baseURL + 'likes/angular-post-i-like-it-video/' , JSON.stringify(DATA) ,{
        headers: headers
      })
      .pipe(map(res => {
        this.store.dispatch(new LikesSuccess(res));
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
    }
    fetchLikes(userId): Observable<Likes> {
      this.store.dispatch(new LikesRequest())
      const auth_token = localStorage.getItem('JWT');
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
      return this.http.get<any>(`${baseURL}likes/angular-get-i-like-it/${userId}` , {
        headers: headers
      })
      .pipe(map(res => {
        this.store.dispatch(new LikesSuccess(res));
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
    }
    fetchImagesLikes(imgId:string): Observable<User[]>{
        const auth_token = localStorage.getItem('JWT');
        const headers = new HttpHeaders({
          'Method': "GET",
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        })
        return this.http.get<any>(`${baseURL}likes/imagen-likes-angular/${imgId}` , {
          headers: headers
        })
        .pipe(map(res => {
          return res
        }),
          catchError(error => this.processHTTPMsgService.handleError(error)));
      }
    fetchVideosLikes(imgId:string): Observable<User[]>{
      
      const auth_token = localStorage.getItem('JWT');
      const headers = new HttpHeaders({
        'Method': "GET",
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth_token}`
      })
      return this.http.get<any>(`${baseURL}likes/videos-likes-angular/${imgId}` , {
        headers: headers
      })
      .pipe(map(res => {
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
    }
}
