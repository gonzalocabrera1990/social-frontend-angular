import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Followers } from './../models/followers.model';
import { FollowersRequest, FollowersSuccess } from '../models/followers-state.model'
import { FollowingRequest, FollowingSuccess } from '../models/following-state.model'
import { StoriesSuccess } from '../models/stories-state.model'

import { Following } from './../models/following.model';

@Injectable({
  providedIn: 'root'
})
export class FollowService {

  constructor(private http: HttpClient,
    private store: Store<AppState>,
    private processHTTPMsgService: ProcessHTTPMsgService ) { }

    

  getFollowers(): Observable<Followers[]> {
    this.store.dispatch(new FollowersRequest());
    const auth_token = localStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    const id = localStorage.getItem('ID')
    return this.http.get<Followers[]>(baseURL + `users/angular-followers/${id}`, {
      headers: headers
    })
      .pipe(map(res => {
        this.store.dispatch(new FollowersSuccess(res));
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
  }
  getFollowing(): Observable<Following[]> {
    this.store.dispatch(new FollowingRequest());
    const auth_token = localStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    const id = localStorage.getItem('ID')
    return this.http.get<Following[]>(baseURL + `users/angular-following/${id}`, {
      headers: headers
    })
      .pipe(map(res => {
        this.store.dispatch(new FollowingSuccess(res));
        this.store.dispatch(new StoriesSuccess(res));
        return res
      }))
      .pipe(catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  followingRequest(followingId: string, followerId: string): Observable<Following[]> {
    
    const auth_token = localStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    const data = {
      followingId: followingId,
      message: "Friend Request"
    }
    return this.http.post<any>(baseURL + `notification/following-user/send/${followerId}`, data, {
      headers: headers
    })
      .pipe(map(res => {
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
  }

  sendData() {
    this.getFollowers()
      .subscribe(res => {
        this.store.dispatch(new FollowersSuccess(res));
      })
    this.getFollowing()
      .subscribe(res => {
        this.store.dispatch(new FollowingSuccess(res));
      })
  }
}
