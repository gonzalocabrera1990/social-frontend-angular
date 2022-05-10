import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router, NavigationEnd } from '@angular/router';


import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { StoriesFilter } from '../models/imageswall.model';
import { FileUploadService } from '../services/file-upload.service';
import { FollowService } from '../services/follow.service';

@Component({
  selector: 'app-users-stories',
  templateUrl: './users-stories.component.html',
  styleUrls: ['./users-stories.component.css']
})
export class UsersStoriesComponent implements OnInit {

  stories: StoriesFilter;
  usuario: string;
  allDisplayStory: any;
  currentDisplayStory: any;
  indexDisplayStory: number;
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
    private route: ActivatedRoute,
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
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }
  
  loadImage = () => {
    let gettime, source;
    window.clearTimeout(this.timeoutfunction)
    this.indexTime = 10 + 's';
    let view = this.currentDisplayStory[this.nextIndex].views.some( v => v === this.userId)
    let img = this.currentDisplayStory[this.nextIndex]._id
    if(!view) this.storyService.storiesView(this.userId, img).subscribe(resp => console.log(resp), err => this.errMess = err)
    let changeUserIndex = this.indexDisplayStory === this.allDisplayStory.length - 1
    let last = this.currentDisplayStory.length - 1 === this.nextIndex
    if (last && changeUserIndex) {
      this.timeoutfunction = setTimeout(() => {
        this.router.navigate(['home']);
      }, 10000)

    } else if (last) {
      this.timeoutfunction = setTimeout(() => {
        this.source = null;
        this.indexDisplayStory = this.indexDisplayStory + 1;
        this.currentDisplayStory = this.allDisplayStory[this.indexDisplayStory]
        let getext = this.allDisplayStory[this.indexDisplayStory][0].filename.split('.')
        let ext = getext[getext.length - 1]
        gettime = this.allDisplayStory[this.indexDisplayStory][0].duration / 1000
        this.nextIndex = 0;
        this.indexTime = gettime + 's'

        source = this.allDisplayStory[this.indexDisplayStory][0].filename;
        this.getMedia(ext, source)
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
    
    
    let changeUserIndex = this.indexDisplayStory === this.allDisplayStory.length - 1
    let last = this.nextIndex === this.currentDisplayStory.length - 1

    if (last && changeUserIndex) {
      this.router.navigate(['home']);
    } else if (last) {
      this.indexDisplayStory = this.indexDisplayStory + 1;
      this.currentDisplayStory = this.allDisplayStory[this.indexDisplayStory]
      let getext = this.allDisplayStory[this.indexDisplayStory][0].filename.split('.')
      let ext = getext[getext.length - 1]
      gettime = this.allDisplayStory[this.indexDisplayStory][0].duration / 1000
      this.nextIndex = 0;
      this.indexTime = gettime + 's'
      source = this.allDisplayStory[this.indexDisplayStory][0].filename;
      this.getMedia(ext, source)
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
    let changeUserIndex = this.indexDisplayStory === this.allDisplayStory.length - 1
    let last = this.nextIndex === this.currentDisplayStory.length - 1

    if (last && changeUserIndex) {
      this.router.navigate(['home']);
    } else if (last) {
      this.indexDisplayStory = this.indexDisplayStory + 1;
      this.currentDisplayStory = this.allDisplayStory[this.indexDisplayStory]
      let getext = this.allDisplayStory[this.indexDisplayStory][0].filename.split('.')
      let ext = getext[getext.length - 1]
      gettime = this.allDisplayStory[this.indexDisplayStory][0].duration / 1000
      this.nextIndex = 0;
      this.indexTime = gettime + 's'
      source = this.allDisplayStory[this.indexDisplayStory][0].filename;
      this.getMedia(ext, source)
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
    let changeUserIndex = this.indexDisplayStory === 0
    let first = this.nextIndex === 0

    if (first && changeUserIndex) {
      this.router.navigate(['home']);
    } else if (first) {

      this.indexDisplayStory = this.indexDisplayStory - 1;
      this.currentDisplayStory = this.allDisplayStory[this.indexDisplayStory]
      let getext = this.allDisplayStory[this.indexDisplayStory][0].filename.split('.')
      let ext = getext[getext.length - 1]
      gettime = this.allDisplayStory[this.indexDisplayStory][0].duration / 1000
      this.nextIndex = 0;
      this.indexTime = gettime + 's'
      source = this.allDisplayStory[this.indexDisplayStory][0].filename;
      this.getMedia(ext, source)
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
  getStylesLeft(width, position) {
    if (position === "first") {
      if (width < 888 && width > 660) {
        return {
          transform: `translateX(${(width * 8) / 100}px) scale(${0.4})`,
          left: `-${(width * 3) / 100}px`
        }
      } else if (width <= 660) {
        return {
          transform: `translateX(${(width * 9) / 100}px) scale(${0.4})`,
          left: `-${(width * 15) / 100}px`
        }
      } else {
        return {
          transform: `translateX(${(width * 21) / 100}px) scale(${0.4})`,
          left: `-${(width * 2) / 100}px`
        }
      }
    }
    if (position === "second") {
      if (width < 1050) {
        return {
          transform: `translateX(${(width * 9) / 100}px) scale(${0.4})`,
          left: `-${(width * 15) / 100}px`
        }
      } else {
        return {
          transform: `translateX(${(width * 8) / 100}px) scale(${0.4})`,
          left: `-${(width * 3) / 100}px`
        }
      }
    }
  }
  getStylesRight(width, position) {
    if (position === "first") {
      if (width < 888 && width > 660) {
        return {
          transform: `translateX(${(width * 10) / 100}px) scale(${0.4})`,
          right: `-${(width * 12) / 100}px`
        }
      } else if (width <= 660) {
        return {
          transform: `translateX(${(width * 4) / 50}px) scale(${0.4})`,
          left: `${(width * 78) / 100}px`
        }
      } else {
        return {
          transform: `translateX(${(width * 14) / 100}px) scale(${0.4})`,
          right: `${(width * 14) / 100}px`
        }
      }
    }
    if (position === "second") {
      if (width < 1050) {
        return {
          transform: `translateX(${(width * 1) / 100}px) scale(${0.4})`,
          right: `-${(width * 20) / 100}px`
        }
      } else {
        return {
          transform: `translateX(${(width * 8) / 100}px) scale(${0.4})`,
          right: `-${(width * 6) / 100}px`
        }
      }
    }
  }
}
