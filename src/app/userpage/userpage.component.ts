import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material';
import { LikeHandleService } from '../services/like-handle.service';
import { CommentsService } from '../services/comments.service';
import { AppState } from '../app.module';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { ImagesWall, StoriesFilter } from '../models/imageswall.model';
import { Likes } from '../models/likes.model';
import { CommentInterface } from '../models/comment.model';
import { CommentsSuccess } from '../models/comment-state.model';

import { ImagesModalComponent } from '../images-modal/images-modal.component';
import { FollowService } from '../services/follow.service';


@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.css']
})
export class UserpageComponent implements OnInit {
  username: string;
  comentarios: any;
  usuario: string;
  modalmood: string = "user";
  errMess: string;
  heart: boolean;
  user: User[];
  album: ImagesWall[];
  carretel: ImagesWall[];
  like: Likes;
  errmess: string;
  following: boolean;
  friendshipRequested: boolean;
  stories: StoriesFilter;
  storiesAvailable: boolean;
  screenWidth: any;
  private storage: string = localStorage.getItem("ID");
  constructor(
    @Inject('baseURL') private baseURL,
    private route: ActivatedRoute,
    private userService: UsersService,
    private store: Store<AppState>,
    private likeService: LikeHandleService,
    private commentService: CommentsService,
    private followService: FollowService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.router.events.subscribe((val: ActivatedRoute) => {
      // see also
      
      let checkParams = !val.snapshot ? null : val.snapshot.params  
      this.usuario = !checkParams ? null : checkParams.user;
    });
  }

  ngOnInit() {
    this.screenWidth = window.innerWidth;
    this.route.paramMap.subscribe(params => {
      this.username = params.get("username");
      this.usuario = params.get("user");
      if (this.username == this.usuario) {
        this.router.navigate(['/userpage']);
      } else {
        this.userService.otherUserLogFetch(this.username, this.usuario)
          .subscribe(res => {
            this.followService.getFollowing()
              .subscribe(response => {
                this.store.select(state => state.stories)
                  .subscribe(story => {
                    this.stories = story.stories;
                    this.story();
                  })
              }, err => this.errMess = err)
          }, err => this.errmess = err)
      }
    });
    this.store.select(state => state.otheruser)
      .subscribe(data => {
        this.user = [data.otheruser]
        this.store.select(state => state.otheruser)
          .subscribe(info => {
            let checkUser = !info.otheruser ? null : info.otheruser;
            this.album = !checkUser ? null : checkUser.imagesWall;
            this.carretel = !checkUser ? null : checkUser.videosWall
            this.following = !checkUser ? null : checkUser.followers.some(foll => foll.id._id === this.storage) ? true : false;
            this.friendshipRequested = !checkUser ? null : checkUser.notifications.some(noti => noti.followingId._id === this.storage) ? true : false;
          })
      }, err => this.errMess = err)
    this.likeService.fetchLikes(localStorage.getItem('ID'))
      .subscribe(res => {
        return;
      }, err => this.errMess = err)

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screenWidth = window.innerWidth;
  }
  story() {
    this.storiesAvailable = this.stories.users.noSeen.some(u => u.id._id == this.user[0]._id)
  }
  sendFriendshipRequested(ID: string) {
    this.followService.followingRequest(this.storage, ID)
      .subscribe(res => {
        this.friendshipRequested = true;
      })
  }

  openDialog(parte, type) {
    const dialogRef = this.dialog.open(ImagesModalComponent, {
      width: '90vw',
      height: '90vh',
      panelClass: 'custom-dialog-container'
    });
    if (type === "imagen") dialogRef.componentInstance.carrousel = this.album;
    if (type === "video") dialogRef.componentInstance.carrousel = this.carretel;
    dialogRef.componentInstance.moody = parte;
    dialogRef.componentInstance.moodstate = this.modalmood;
    dialogRef.componentInstance.mediaType = type;

    let indexImg = this.album.findIndex(i => i === parte)
    if (indexImg === 0) dialogRef.componentInstance.back = false;
    if (indexImg === this.album.length - 1) dialogRef.componentInstance.forth = false;
    if (this.album.length === 1) {
      dialogRef.componentInstance.forth = false;
      dialogRef.componentInstance.back = false;
    }

    let indexVideo = this.carretel.findIndex(i => i === parte)
    if (indexVideo === 0) dialogRef.componentInstance.back = false;
    if (indexVideo === this.carretel.length - 1) dialogRef.componentInstance.forth = false;
    if (this.carretel.length === 1) {
      dialogRef.componentInstance.forth = false;
      dialogRef.componentInstance.back = false;
    }

    this.commentService.getComment(parte._id)
      .subscribe(com => {
        dialogRef.componentInstance.comentarios = com;
        dialogRef.componentInstance.commentsLoad = false;
      })

    const sub = dialogRef.componentInstance.newItemEvent.subscribe((image: string) => {

      this.likeService.postLike({ id: localStorage.getItem('ID'), liked: image })
        .subscribe(res => {
          this.likeService.fetchImagesLikes(image)
            .subscribe(l => {
              dialogRef.componentInstance.likes = l
            })
        }, err => this.errMess = err)
    });

    const coomm = dialogRef.componentInstance.newCommentEventUserComponent.subscribe((comment: any) => {

      dialogRef.componentInstance.commentsLoad = true;
      const commenta: CommentInterface = {
        comment: comment.commentValue,
        author: localStorage.getItem('ID'),
        image: comment.imageId
      }
      this.commentService.postUserModalComment(commenta)
        .subscribe(res => {
          return;
        }, err => this.errMess = err)
      this.store.select(c => c.comments)
        .subscribe(res => {
          dialogRef.componentInstance.comentarios = res.comments;
          dialogRef.componentInstance.commentsLoad = false
        })
    });
    const deletecoomm = dialogRef.componentInstance.deleteCommentEvent.subscribe((comment: string) => {
      this.commentService.postDeleteComment(comment)
        .subscribe(res => {
          let commentResult = dialogRef.componentInstance.comentarios.filter(c => c._id != res._id)
          this.comentarios = commentResult;
          dialogRef.componentInstance.comentarios = commentResult;
          this.store.dispatch(new CommentsSuccess(commentResult));
        })
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
