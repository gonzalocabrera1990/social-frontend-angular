import { Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Following } from 'src/app/models/following.model';
import { Inbox } from 'src/app/models/inbox.model';

@Component({
  selector: 'app-chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.css']
})
export class ChatViewComponent implements OnInit {
  @Input() maintalk: Inbox;
  @Input() newTalkStatus: boolean;
  @Input() newTalkUser: Following;
  @Output() sendMessageEvent = new EventEmitter<any>();
  @ViewChild('cform') commentFormDirective;
  commentForm: FormGroup;
  public storage: string = localStorage.getItem("ID");
  usuario: string;

  constructor(private fb: FormBuilder, @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.usuario = localStorage.getItem('CREDS').split('@')[0];
    this.createForm();
  }
  createForm() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.newTalkStatus) {
      
      
      let talking = {
        message: this.commentForm.value,
        talk: {
          room: "",
          _id: null
        },
        receptor: this.newTalkUser.id._id
      }
      this.sendMessageEvent.emit(talking);
    } else {
      let getReceptor = this.maintalk.members.userOne._id === this.storage ?
        this.maintalk.members.userTwo._id :
        this.maintalk.members.userOne._id
      let talking = {
        message: this.commentForm.value,
        talk: this.maintalk,
        receptor: getReceptor
      }
      this.sendMessageEvent.emit(talking);
    }
    this.commentFormDirective.resetForm();
    this.commentForm.reset({
      comment: ''
    });
  }

}
