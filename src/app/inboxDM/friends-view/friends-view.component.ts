import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FollowService } from '../../services/follow.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module';
import { Following } from 'src/app/models/following.model';

@Component({
  selector: 'app-friends-view',
  templateUrl: './friends-view.component.html',
  styleUrls: ['./friends-view.component.css']
})
export class FriendsViewComponent implements OnInit {
  @Input() follows: Following[];
  @Output() selectTalkEvent = new EventEmitter<string>();
  errMess: string;
  constructor(private followService: FollowService, private store: Store<AppState>,
    @Inject('baseURL') private baseURL) { }

  ngOnInit() { }

  selectTalk(talk: string) {
    
    this.selectTalkEvent.emit(talk);
    
  }
}