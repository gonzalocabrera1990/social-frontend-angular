import { Component, OnInit, Input, Inject, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/user.model';


@Component({
  selector: 'app-likes-modal',
  templateUrl: './likes-modal.component.html',
  styleUrls: ['./likes-modal.component.css']
})
export class LikesModalComponent implements OnInit {
  @Input() likes: User[];
  @Output() closeDialogsEvent = new EventEmitter();
  usuario: string;
  constructor(@Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.usuario = localStorage.getItem('CREDS').split('@')[0];
  }
  closeDialogs(){
    this.closeDialogsEvent.emit()
  }

}
