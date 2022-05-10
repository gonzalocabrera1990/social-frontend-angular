import { Component, OnInit , Inject, Input} from '@angular/core';
import { FollowService } from '../services/follow.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { Followers } from '../models/followers.model'
import { Following } from '../models/following.model';

@Component({
  selector: 'app-follow-tab',
  templateUrl: './follow-tab.component.html',
  styleUrls: ['./follow-tab.component.css']
})
export class FollowTabComponent implements OnInit {
followers: Followers[];
following: Following[];
usuario: string;
errMess: string;
  constructor(private followService: FollowService, private store: Store<AppState>,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.followService.getFollowers()
    .subscribe(res => {
      return;
    }, err => this.errMess = err)
    this.followService.getFollowing()
    .subscribe(res => {
      return;
    }, err => this.errMess = err)

  this.store.select(state => state.followers)
    .subscribe(data => {
      this.followers = data.followers
      this.store.select(state => state.following)
        .subscribe(data => {
          this.following = data.following
          
        }) 
    }, err => this.errMess = err)
    
      this.usuario = localStorage.getItem('CREDS').split('@')[0];
      
  }

}
