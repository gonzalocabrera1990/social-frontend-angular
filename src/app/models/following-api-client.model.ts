import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import { AppState } from './../app.module';

@Injectable()
export class AuthApiClient {
  destinos: User = null;

  constructor(private store: Store<AppState>) {
    this.store
      .select(state => state.user)
      .subscribe((data) => {
        this.destinos = data.user;
      });
    this.store
      .subscribe((data) => {
        return;
      });
  }
}
