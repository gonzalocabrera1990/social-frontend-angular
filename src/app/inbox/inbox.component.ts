import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  constructor(private auths: AuthService) { }

  ngOnInit() {
  }
  logout() {
    this.auths.destroyUserCredentials();
  }
}
