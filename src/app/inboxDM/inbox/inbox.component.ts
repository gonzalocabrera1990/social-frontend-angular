import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module';
import { Inbox } from 'src/app/models/inbox.model';
import { InboxService } from '../../services/inbox.service';
import { FollowService } from 'src/app/services/follow.service';
import { Following } from '../../models/following.model';


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {
  private currentUser: string = localStorage.getItem("ID");
  follows: Following[];
  talks: Inbox[];
  maintalk: any;
  errMess: string;
  newTalkStatus: boolean;
  newTalkUser: Following;

  constructor(private inboxService: InboxService,
    private store: Store<AppState>,
    private followService: FollowService) { }

  ngOnInit() {
    this.inboxService.inboxFetch()
      .subscribe(res => {
        return;
      })
    this.followService.getFollowing()
      .subscribe(res => {
        return;
      }, err => this.errMess = err)

    this.store.select(state => state.inbox)
      .subscribe(data => {
        this.talks = data.inbox
      }, err => this.errMess = err)

    this.store.select(state => state.following)
      .subscribe(data => {
        this.follows = data.following
      }, err => this.errMess = err)
  }
  loadTalkMain(e: string) {
    let talk = this.talks.filter(t => t._id === e)[0]
    this.inboxService.talkFetch(talk)
      .subscribe((data) => {
        this.maintalk = data;
        this.newTalkUser = this.getFollowUser(data)
      });
  }
  sendMessageEvent(data) {
    const talkId = data.talk._id
    const RECEPTOR = data.receptor
    const EMISOR = localStorage.getItem('ID')
    const roomSocket = data.talk.room
    const datad = {
      contenido: {
        members: {
          userOne: EMISOR,
          userTwo: RECEPTOR
        },
        talk: {
          author: EMISOR,
          content: data.message.comment
        }
      },
      talkId,
      roomSocket
    }
    this.inboxService.sendMessage(datad)
      .subscribe((data) => {
        this.maintalk = data;
        this.newTalkStatus = false;
        this.newTalkUser = this.getFollowUser(data)
        let filterTalk = this.talks.some(t => t._id === data._id)
        if (!filterTalk) this.talks.push(data);
      })
  }
  selectTalkMain(e: string) {
    this.newTalkUser = null;
    var ids = e;
    let usuario = this.currentUser;
    let charla = this.existChat(ids)
    let result = charla[0] ? true : false
    this.newTalkUser = this.follows.filter(s => s.id._id === ids)[0]
    if (result) {
      let room = charla[0].room
      let query = charla[0]._id
      let data = {
        query, usuario, room
      }
      this.inboxService.inboxTalksHandler(data, e)
        .subscribe((data) => {
          this.maintalk = data;
          this.newTalkStatus = false;
          return;
        });
    } else {
      this.newTalkStatus = true;
      this.maintalk = null;
    }

  }
  existChat(ID) {
    let userMain = this.currentUser;
    let frienid = ID
    let findTalk = this.talks === null ? [] :
      this.talks.filter(t => {//return complete chat with these conditions
        return t.members.userOne._id === userMain && t.members.userTwo._id === frienid ?
          t.members.userOne._id === userMain && t.members.userTwo._id === frienid :
          t.members.userTwo._id === userMain && t.members.userOne._id === frienid
      })
    return findTalk;
  }
  getFollowUser(data) {
    let userMain = this.currentUser;
    let findUser = data.members.userOne._id === userMain ? data.members.userTwo._id : data.members.userOne._id;
    let follow = this.follows.filter(s => s.id._id === findUser)[0]
    return follow;
  }
}
