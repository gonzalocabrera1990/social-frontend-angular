import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FollowService } from '../services/follow.service'
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';

@Component({
  selector: 'app-start-story',
  templateUrl: './start-story.component.html',
  styleUrls: ['./start-story.component.css']
})
export class StartStoryComponent implements OnInit {
  @ViewChild('scrollStoriesContent') scrollStoriesContent: ElementRef;
  stories: any;
  errMess: string;
  constructor(private followService: FollowService,
    @Inject('baseURL') private baseURL,
    private store: Store<AppState> ) { }

  ngOnInit() {
    this.store.select(state => state.stories)
      .subscribe(data => {
        this.stories = data.stories
    
      }, err => this.errMess = err)
}
scrollLeft(){
  this.scrollStoriesContent.nativeElement.scrollLeft -= 150;
}

scrollRight(){
  this.scrollStoriesContent.nativeElement.scrollLeft += 150;
}
}
