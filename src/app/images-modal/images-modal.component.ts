import { Component, Input, Output, EventEmitter, OnInit, Inject, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { MatDialogRef, MatDialog } from '@angular/material';
import { Comment } from '../models/comment.model';
import { Content, ContentVideo } from '../models/content.model';
import { ImagesWall } from '../models/imageswall.model';
import { LikesModalComponent } from '../modals/likes-modal/likes-modal.component';
import { User } from '../models/user.model';
import { CommentsService } from '../services/comments.service';
import { LikeHandleService } from '../services/like-handle.service';

@Component({
  selector: 'app-images-modal',
  templateUrl: './images-modal.component.html',
  styleUrls: ['./images-modal.component.css']
})
export class ImagesModalComponent implements OnInit {
likes: User[] = [];
errMess: string;
@Input() moody;
@Input() moodstate: string;
@Input() carrousel: ImagesWall[];
@Input() comments: Comment[];
@Input() mediaType: string;
@Input('comentarios') comentarios: Comment[];
@Output() newItemEvent = new EventEmitter<string>();
@Output() newCommentEvent = new EventEmitter<{imageId: string, commentValue:string}>();
@Output() newCommentEventUserComponent = new EventEmitter<{imageId: string, commentValue:string}>();
@Output() deleteCommentEvent = new EventEmitter<string>();
@ViewChild('cform') commentFormDirective;
public storage: string = localStorage.getItem("ID");
public usuario: string;
commentForm: FormGroup;
likestate: boolean;
back: boolean = true;
forth: boolean = true;
playVideo: boolean = false;
commentsLoad: boolean = true;

  constructor(  @Inject('baseURL') private baseURL,
                public dialogRef: MatDialogRef<ImagesModalComponent>,
                private likeService: LikeHandleService,
                private commentService: CommentsService,
                public dialog: MatDialog,
                private fb: FormBuilder,
                private store: Store<AppState>) { }

  ngOnInit() {
    if(this.moodstate === "user"){
      this.store.select(state => state.likes)
      .subscribe(data => {
        let checkLikes = !data.likes ? null : data.likes;
        this.likestate = !checkLikes ? null : checkLikes.image.find(i=> i === this.moody._id) ? true : false
      }, err => this.errMess = err) 
      this.createForm();
      this.getItemLikesUserComponent()
    } else if(this.moodstate === "start") {
      this.createForm();
      this.getItemLikes()
    }
    this.usuario = localStorage.getItem('CREDS').split('@')[0];

  }

  getItemLikesUserComponent() {
    if(this.mediaType === "imagen"){
      this.likeService.fetchImagesLikes(this.moody._id)
      .subscribe(res => {
        this.likes = res;
      }, err => this.errMess = err)
    } else if(this.mediaType === "video"){
      this.likeService.fetchVideosLikes(this.moody._id)
      .subscribe(res => {
        this.likes = res;
      }, err => this.errMess = err)
    }
  }
  getItemLikes() {
    const mediaType = this.moody.imageId ? "imagen": "video"
    if(mediaType === "imagen"){
      let itemid = this.moody.imageId._id
      this.likeService.fetchImagesLikes(itemid)
      .subscribe(res => {
        this.likes = res;
      }, err => this.errMess = err)
    } else {
      let itemid = this.moody.videoId._id
      this.likeService.fetchVideosLikes(itemid)
      .subscribe(res => {
        this.likes = res;
      }, err => this.errMess = err)
    }
  }
  
  play(event){
    if(this.playVideo) event.target.pause();
    if(!this.playVideo) event.target.play();
    this.playVideo = !this.playVideo
  }
  endVideo(){
    this.playVideo = !this.playVideo
  }
  backForthModal(event){
      let mode = event.target.parentElement.attributes.name.nodeValue;
      if (mode === "back" && this.mediaType === "imagen") {
        let back = this.carrousel.findIndex(img => img._id === this.moody._id) - 1
        back == 0 ? this.back = false : this.back = true;
        this.forth = true
        this.moody = this.carrousel[back];
        this.fetchImageData();
      } else if (mode === "forth" && this.mediaType === "imagen") {
        let forth = this.carrousel.findIndex(img => img._id === this.moody._id) + 1
        forth == this.carrousel.length - 1 ? this.forth = false : this.forth = true;
        this.back = true
        this.moody = this.carrousel[forth]
        this.fetchImageData();
      } else if (mode === "back" && this.mediaType === "video") {
        let back = this.carrousel.findIndex(img => img._id === this.moody._id) - 1
        back == 0 ? this.back = false : this.back = true;
        this.forth = true
        this.moody = this.carrousel[back];
        this.fetchVideoData();
      } else if (mode === "forth" && this.mediaType === "video"){
        let forth = this.carrousel.findIndex(img => img._id === this.moody._id) + 1
        forth == this.carrousel.length - 1 ? this.forth = false : this.forth = true;
        this.back = true
        this.moody = this.carrousel[forth]
        this.fetchVideoData();
      }
  }
  fetchImageData(){
    this.commentService.getComment(this.moody._id)
    .subscribe(com =>{
      this.comentarios = com
    })
    this.likeService.fetchImagesLikes(this.moody._id)
    .subscribe(l =>{
      this.likes = l
      this.likestate = l.find(i=> i._id === this.storage) ? true : false
    })
  }
  fetchVideoData(){
    this.commentService.getComment(this.moody._id)
    .subscribe(com =>{
      this.comentarios = com
    })
    this.likeService.fetchVideosLikes(this.moody._id)
    .subscribe(l =>{
      this.likes = l
      this.likestate = l.find(i=> i._id === this.storage) ? true : false
    })
  }
   handleLikeUserComponent(imgID) {
    let img = imgID;
    var usersData = {
        id: localStorage.getItem('ID'),
        liked: img
    }
    
    if(this.mediaType === "imagen"){
        this.likeService.postLike(usersData)
        .subscribe(res => {
          this.likestate = res.image.find(i=> i === this.moody._id) ? true : false
          this.getItemLikesUserComponent()
        }, err => this.errMess = err)

    } else if(this.mediaType === "video") {

      this.likeService.postLikeVideo(usersData)
      .subscribe(res => {
        this.likestate = res.image.find(i=> i === this.moody._id) ? true : false
        this.getItemLikesUserComponent()
      }, err => this.errMess = err)
    }
  }
  handleLike(imgID) {
    let img = imgID;
    var usersData = {
        id: localStorage.getItem('ID'),
        liked: img
    }
    const mediaType = this.moody.imageId ? "imagen": "video"
    if(mediaType === "imagen"){
        this.likeService.postLike(usersData)
        .subscribe(res => {
          this.likestate = res.image.find(i=> i === this.moody.imageId._id) ? true : false
          this.getItemLikes()
        }, err => this.errMess = err)

    } else {

      this.likeService.postLikeVideo(usersData)
      .subscribe(res => {
        this.likestate = res.image.find(i=> i === this.moody.videoId._id) ? true : false
        this.getItemLikes()
      }, err => this.errMess = err)
    }
  }
  likeEvent() {
    const mediaType = this.moody.imageId ? this.moody.imageId : this.moody.videoId
    this.newItemEvent.emit(mediaType)
    this.likestate = !this.likestate
    return false;
  }
  commentEvent(comment:string, imgId:string) {
    this.newCommentEvent.emit({imageId: imgId, commentValue: comment});
    return false;
  }
  commentEventUserComponent(comment:string, imgId:string) {
    this.newCommentEventUserComponent.emit({imageId: imgId, commentValue: comment});
    return false;
  }
  deleteComment(commentValue:string) {
    this.deleteCommentEvent.emit(commentValue)
    return false;
  }
  createForm() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }
  onSubmitUserComponent(imgId) {
    this.commentEventUserComponent(this.commentForm.value.comment, imgId)
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      comment: ''
    });
  }
  onSubmit() {
    let imgId = this.moody.imageId ? this.moody.imageId._id : this.moody.videoId._id
   this.commentEvent(this.commentForm.value.comment, imgId)
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      comment: ''
    });
  }
  openLoginForm() {
    const loginRef = this.dialog.open(LikesModalComponent, { width: '500px', height: '450px', panelClass: 'custom-dialog-likes' });
    loginRef.componentInstance.likes = this.likes
    loginRef.afterClosed()
      .subscribe(result => {
        console.log("login modal", result);
      });
      const coomm = loginRef.componentInstance.closeDialogsEvent.subscribe(() => {
        this.dialog.closeAll()
      })
  }
  closeDialog(){
    this.dialogRef.close()
  }
}
