import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Inbox } from 'src/app/models/inbox.model';

@Component({
  selector: 'app-talk',
  templateUrl: './talk.component.html',
  styleUrls: ['./talk.component.css']
})
export class TalkComponent implements OnInit {

  @Input() talk: Inbox;
  @Output() talkEvent = new EventEmitter<string>();
  private currentUser: string = localStorage.getItem("ID");
  public readStatus: boolean;
  
  constructor(@Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.readStatus = this.talk.talk.some(t => t.author !== this.currentUser && t.seen === false)
  }
  talkId(talk: string) {
    this.readStatus = false;
    this.talkEvent.emit(talk);
  }
}
