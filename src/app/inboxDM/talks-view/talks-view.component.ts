import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { Inbox } from 'src/app/models/inbox.model';

@Component({
  selector: 'app-talks-view',
  templateUrl: './talks-view.component.html',
  styleUrls: ['./talks-view.component.css']
})
export class TalksViewComponent implements OnInit {
  
  @Input() talks: Inbox[];
  @Output() loadTalkEvent = new EventEmitter<string>();
 
  
  constructor() { }

  ngOnInit() {
  }

  loadTalk(talk: string) {
    
    this.loadTalkEvent.emit(talk);

  }
}
