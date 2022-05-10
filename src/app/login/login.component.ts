import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  openLoginForm() {
    const loginRef = this.dialog.open(ModalComponent, { width: '500px', height: '450px' });

    loginRef.afterClosed()
      .subscribe(result => {
        console.log("login modal", result);
      });
  }
}
