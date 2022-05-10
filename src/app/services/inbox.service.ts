import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import * as socketIo from 'socket.io-client';

import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { Inbox } from '../models/inbox.model';
import { InboxRequest, InboxSuccess } from '../models/inbox-state.model';


@Injectable({
  providedIn: 'root'
})
export class InboxService {
  socket: any;

  constructor(private http: HttpClient,
    private store: Store<AppState>,
    private processHTTPMsgService: ProcessHTTPMsgService,
    ) {
      this.socket = socketIo(baseURL);
     }
    
    socketconection(socketInfo){
      this.socket.emit('usernameAngular', socketInfo)
      return new Observable<any>(observer => {
        this.socket.on('returnUsernameAngular', (data: any) =>{
    
          return observer.next(data)
        })
        })
    }

  inboxFetch(): Observable<Inbox[]>  {
    this.store.dispatch(new InboxRequest());
    const auth_token = localStorage.getItem('JWT');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${auth_token}`
    })
    const id = localStorage.getItem('ID')
    return this.http.get<Inbox[]>(baseURL + `inbox-message/getch/${id}`, {
      headers: headers
    })
      .pipe(map(res => {
        this.store.dispatch(new InboxSuccess(res));
        return res
      }),
        catchError(error => this.processHTTPMsgService.handleError(error)));
 
  }
talkFetch(datos){
  let data = {
    query: datos._id,
    usuario: localStorage.getItem("ID"),
    room: datos.room
  }
  this.socket.emit("fetchChat", data);

return new Observable<any>(observer => {
  this.socket.on('sendChat', (data: Inbox) =>{
    
    return observer.next(data)
  })
 })
}

  inboxTalksHandler(datos:any, user: string){
      let data = {
        query: datos.query,
        usuario: datos.usuario,
        room: datos.room
      }
      this.socket.emit("fetchChat", data);

    return new Observable<any>(observer => {
      this.socket.on('sendChat', (data: Inbox) =>{
        return observer.next(data)
      })
      })
}

  sendMessage(datad){
  this.socket.emit('sendMessage', datad)
  return new Observable<any>(observer => {
    this.socket.on('sendChat', (data: Inbox) =>{
      return observer.next(data)
    })
    })
  }
  socketIoConection( event: string){
    return new Observable<Inbox>(observer =>{
      this.socket.on( event, data =>{
        observer.next(data)
      })
    })
  }

}
