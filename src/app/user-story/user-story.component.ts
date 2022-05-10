import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Store } from '@ngrx/store';
import { AppState } from '../app.module';

import { StoriesFilter } from '../models/imageswall.model';
import { FileUploadService } from '../services/file-upload.service';
import { FollowService } from '../services/follow.service';

@Component({
  selector: 'app-user-story',
  templateUrl: './user-story.component.html',
  styleUrls: ['./user-story.component.css']
})
export class UserStoryComponent implements OnInit {

  stories: StoriesFilter;
  usuario: string;
  allDisplayStory: any;
  currentDisplayStory: any;
  indexDisplayStory: any;
  indexTime: any;
  nextIndex: number = 0;
  currentMediaDisplay: string;
  timeoutfunction: any;
  errMess: string;
  userId: string;
  source: string = null;
  screenWidth: any;

  constructor(@Inject('baseURL') private baseURL,
  private router: Router,
  private readonly location: Location,
  private route: ActivatedRoute ,
  private store: Store<AppState>,
  private followService: FollowService,
  private storyService: FileUploadService) {
  this.router.events.subscribe((val: ActivatedRoute) => {
    // see also
    let checkParams = !val.snapshot ? null : val.snapshot.params
    this.usuario = !checkParams ? null : checkParams.userId;
  });
}

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.route.paramMap.subscribe(params => {
      this.usuario = params.get("userId");
    });
    this.followService.getFollowing()
      .subscribe(res => {
        this.store.select(state => state.stories)
          .subscribe(data => {
            this.stories = data.stories
            this.userId = localStorage.getItem("ID")
            let noSeenFilter = data.stories.stories.noSeen //filter stories with noSeen
            let seenFilter = data.stories.stories.seen //filter stories seen

            let allStories = noSeenFilter.concat(seenFilter) //filter props stories and joint it
            this.allDisplayStory = allStories //array of all stories

            //get stories based on user params id
            let fixCurrent: any = allStories.filter(h => h[0].userData._id === this.usuario)[0]
            this.currentDisplayStory = fixCurrent;
            //get user index
            let currentIndex = allStories.findIndex(h => h[0].userData._id === this.usuario)
            this.indexDisplayStory = currentIndex;

            let getDuration = !fixCurrent ? null : fixCurrent[0].duration / 1000
            this.indexTime = getDuration + 's';

            let getext = !allStories[currentIndex] ? null : allStories[currentIndex][this.nextIndex].filename.split('.')
            let ext = !getext ? null : getext[getext.length - 1]
            let source = !allStories[currentIndex] ? null : allStories[currentIndex][this.nextIndex].filename;
            this.getMedia(ext, source)

          }, err => this.errMess = err)
      }, err => this.errMess = err)
  }


  getMedia(ext, source) {
    if (ext === "png" ||
      ext === "jpg" ||
      ext === "jpeg" ||
      ext === "gif" ||
      ext === "ico"
    ) {
      this.currentMediaDisplay = "imagen"
      this.source = source
    } else {
      this.currentMediaDisplay = "video"
      this.source = source
    }
  }
  loadImage = () => {
    let gettime, source;
    window.clearTimeout(this.timeoutfunction)
    this.indexTime = 10 + 's';
    let view = this.currentDisplayStory[this.nextIndex].views.some( v => v === this.userId)
    let img = this.currentDisplayStory[this.nextIndex]._id
    if(!view) this.storyService.storiesView(this.userId, img).subscribe(resp => console.log(resp), err => this.errMess = err)
    let last = this.currentDisplayStory.length - 1 === this.nextIndex
    if (last) {
      this.timeoutfunction = setTimeout(() => {
        this.location.back();
      }, 10000)

    } else {
      this.timeoutfunction = setTimeout(() => {
        this.source = null;
        this.nextIndex = this.nextIndex + 1;
        let getext = this.allDisplayStory[this.indexDisplayStory][this.nextIndex].filename.split('.')
        let ext = getext[getext.length - 1]
        gettime = this.allDisplayStory[this.indexDisplayStory][this.nextIndex].duration / 1000
        this.indexTime = gettime + 's';
        source = this.allDisplayStory[this.indexDisplayStory][this.nextIndex].filename;
        this.getMedia(ext, source)
      }, 10000)
    }
  }
  videoEnd = () => {
    let gettime, source;
    window.clearTimeout(this.timeoutfunction)
    this.source = null;
    
    let view = this.currentDisplayStory[this.nextIndex].views.some( v => v === this.userId)
    let img = this.currentDisplayStory[this.nextIndex]._id
    if(!view) this.storyService.storiesView(this.userId, img).subscribe(resp => console.log(resp), err => this.errMess = err)
   
    let last = this.nextIndex === this.currentDisplayStory.length - 1

    if (last) {
      this.location.back();
    } else {
      this.nextIndex = this.nextIndex + 1;
      let getext = this.allDisplayStory[this.indexDisplayStory][this.nextIndex].filename.split('.')
      let ext = getext[getext.length - 1]
      gettime = this.allDisplayStory[this.indexDisplayStory][this.nextIndex].duration / 1000
      this.indexTime = gettime + 's';
      source = this.allDisplayStory[this.indexDisplayStory][this.nextIndex].filename;
      this.getMedia(ext, source)
    }
  }

  forth() {
    let gettime, source;
    window.clearTimeout(this.timeoutfunction)
    this.source = null;
    let last = this.nextIndex === this.currentDisplayStory.length - 1

    if (last) {
      this.location.back();
    } else {
      this.nextIndex = this.nextIndex + 1;
      let getext = this.allDisplayStory[this.indexDisplayStory][this.nextIndex].filename.split('.')
      let ext = getext[getext.length - 1]
      gettime = this.allDisplayStory[this.indexDisplayStory][this.nextIndex].duration / 1000
      this.indexTime = gettime + 's';
      source = this.allDisplayStory[this.indexDisplayStory][this.nextIndex].filename;
      this.getMedia(ext, source)
    }
  }
  back() {
    let gettime, source;
    window.clearTimeout(this.timeoutfunction)
    this.source = null;
    let first = this.nextIndex === 0

    if (first) {
      this.location.back();
    } else {
      this.nextIndex = this.nextIndex - 1;
      let getext = this.allDisplayStory[this.indexDisplayStory][this.nextIndex].filename.split('.')
      let ext = getext[getext.length - 1]
      gettime = this.allDisplayStory[this.indexDisplayStory][this.nextIndex].duration / 1000
      this.indexTime = gettime + 's';
      source = this.allDisplayStory[this.indexDisplayStory][this.nextIndex].filename;
      this.getMedia(ext, source)
    }
  }
}
