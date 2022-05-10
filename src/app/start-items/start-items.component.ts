import { Component, OnInit, Input, OnChanges, Inject, HostBinding, SimpleChanges } from '@angular/core';
import { Content, ContentVideo } from '../models/content.model';
import { Likes } from '../models/likes.model';
import { CommentInterface } from '../models/comment.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { LikeHandleService } from '../services/like-handle.service';
import { CommentsService } from '../services/comments.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ImagesModalComponent } from '../images-modal/images-modal.component';
import { Album } from '../models/album.model';
import { User } from '../models/user.model';


@Component({
  selector: 'app-start-items',
  templateUrl: './start-items.component.html',
  styleUrls: ['./start-items.component.css']
})
export class StartItemsComponent implements OnInit {
  @Input() item;
  @Input() carrusel: Album[];
  like: Likes;
  likesItem: User[];
  comments: Content[];
  usuario: string;
  modalmood: string = "start";
  errMess: string;
  heart: boolean = false;
  commentLength: number = 0;
  playVideo: boolean = false;

  @HostBinding('attr.class') cssClass = 'row';
  constructor(@Inject('baseURL') private baseURL,
    private store: Store<AppState>,
    private likeService: LikeHandleService,
    private commentService: CommentsService,
    public dialog: MatDialog) { }

  ngOnInit() {
    const mediaType = this.item.imageId ? "imagen" : "video";
    let commentsFilter = this.item.commento[0];
    if (!commentsFilter) this.commentLength = 0;
    if (commentsFilter) this.commentLength = commentsFilter[1] ? 2 : 1;

    this.store.select(state => state.likes)
      .subscribe(data => {
        this.like = data.likes
        this.store.select(state => state.likes)
          .subscribe(data => {
            let filterLikes = !data.likes ? null : data.likes
            if (mediaType === "imagen" && filterLikes) {
              this.heart = filterLikes.image.find(i => i === this.item.imageId._id) ? true : false
            } else if (mediaType === "video" && filterLikes) {
              this.heart = filterLikes.image.find(i => i === this.item.videoId._id) ? true : false
            }
          })
      }, err => this.errMess = err)

    this.usuario = localStorage.getItem('CREDS').split('@')[0];
  }

  handleLike(imgID) {
    let img = imgID;
    var usersData = {
      id: localStorage.getItem('ID'),
      liked: img
    }
    const mediaType = this.item.imageId ? "imagen" : "video"
    if (mediaType === "imagen") {
      this.likeService.postLike(usersData)
        .subscribe(res => {
          return;
        }, err => this.errMess = err)
      this.store.select(state => state.likes)
        .subscribe(data => {
          this.like = data.likes;
          this.store.select(state => state.likes)
            .subscribe(data => {

              let filterLikes = !data.likes ? null : data.likes
              if (filterLikes) {
                this.heart = filterLikes.image.find(i => i === this.item.imageId._id) ? true : false
                return data
              }
            })
        }, err => this.errMess = err);

    } else {

      this.likeService.postLikeVideo(usersData)
        .subscribe(res => {
          return;
        }, err => this.errMess = err)
      this.store.select(state => state.likes)
        .subscribe(data => {
          this.like = data.likes;
          this.store.select(state => state.likes)
            .subscribe(data => {
              let filterLikes = !data.likes ? null : data.likes
              if (filterLikes) {
                this.heart = filterLikes.image.find(i => i === this.item.videoId._id) ? true : false
                return data
              }
            })
        }, err => this.errMess = err);
    }
  }
  play(event) {
    if (this.playVideo) event.target.pause();
    if (!this.playVideo) event.target.play();
    this.playVideo = !this.playVideo
  }
  endVideo() {
    this.playVideo = !this.playVideo
  }
  openDialog() {
    const dialogRef = this.dialog.open(ImagesModalComponent, {
      width: '90vw',
      height: '90vh',
      panelClass: 'custom-dialog-container'
    });
    dialogRef.componentInstance.moody = this.item;
    dialogRef.componentInstance.likestate = this.heart;
    dialogRef.componentInstance.moodstate = this.modalmood;

    const mediaType = this.item.imageId ? this.item.imageId._id : this.item.videoId._id
    this.commentService.getComment(mediaType)
      .subscribe(com => {
        dialogRef.componentInstance.comentarios = com;
        dialogRef.componentInstance.commentsLoad = false;
      })


    const sub = dialogRef.componentInstance.newItemEvent.subscribe((image: string) => {

      this.handleLike(image)
    });
    const coomm = dialogRef.componentInstance.newCommentEvent.subscribe((comment: any) => {
      dialogRef.componentInstance.commentsLoad = true;
      dialogRef.componentInstance.comentarios = [];
      const commenta: CommentInterface = {
        comment: comment.commentValue,
        author: localStorage.getItem('ID'),
        image: comment.imageId
      }
      this.commentService.postUserModalComment(commenta)
        .subscribe(res => {
          dialogRef.componentInstance.comentarios = res;
          dialogRef.componentInstance.commentsLoad = false;
          let test = res.length
          this.commentLength = test;
          this.item.commento[0] = test === 1 ? res[0] : res;
        }, err => this.errMess = err)

    });
    const deletecoomm = dialogRef.componentInstance.deleteCommentEvent.subscribe((comment: string) => {

      dialogRef.componentInstance.commentsLoad = true;
      this.commentService.postDeleteComment(comment)
        .subscribe(res => {
          let test = this.item.commento[0]

          if (test.length > 2) {
            let indice = this.item.commento[0].findIndex(comm => comm._id === res._id)
            this.item.commento[0].splice(indice, 1)
            dialogRef.componentInstance.comentarios = this.item.commento[0]
            dialogRef.componentInstance.commentsLoad = false;
          } else if (test.length === 2) {

            let indice = this.item.commento[0].findIndex(comm => comm._id === res._id);
            this.item.commento[0].splice(indice, 1);
            this.commentLength = 1;

            dialogRef.componentInstance.comentarios = this.item.commento[0]
            dialogRef.componentInstance.commentsLoad = false;

            this.item.commento[0] = this.item.commento[0][0]

          } else if (test._id) {
            this.item.commento[0] = null;
            this.commentLength = 0;
            dialogRef.componentInstance.comentarios = []
            dialogRef.componentInstance.commentsLoad = false;

          }



        })
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  show() {
    let commentsFilter = this.item.commento[0];
    if (!commentsFilter) {
      this.commentLength = 0;
    }
    if (commentsFilter) {
      if (commentsFilter[1]) {
        this.commentLength = 2;
      } else {
        this.commentLength = 1;
      }
    }
  }
}