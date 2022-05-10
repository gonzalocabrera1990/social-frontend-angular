import { Component, OnInit, HostBinding } from '@angular/core';
import { ContentService } from '../services/content.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { Content } from '../models/content.model';
import { LikeHandleService } from '../services/like-handle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'container';
  content: Content[];
  errMess: string;
  constructor(private contentService: ContentService,
    private store: Store<AppState>,
    private likeService: LikeHandleService) { }

  ngOnInit() {
    this.contentService.getTheStartWall()
      .subscribe(res => {
        return;
      }, err => this.errMess = err)
    this.likeService.fetchLikes(localStorage.getItem('ID'))
      .subscribe(res => {
        return;
      }, err => this.errMess = err)
    this.store.select(state => state.content)
      .subscribe(data => {
        if (data.content) {
          this.content = data.content;
        }
      }, err => this.errMess = err)
  }

}
