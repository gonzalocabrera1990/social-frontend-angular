import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  loadingLogin: boolean = true;
  user = { username: '', password: '', remember: false };
  errMess: string;

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
    private authService: AuthService, public router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.loadingLogin = false;
    this.errMess = "" ;
    this.authService.logIn(this.user)
      .subscribe(res => {
        if (res.success) {
          this.dialogRef.close(res.success);
          this.router.navigate(['home']);
        } 
      },
        error => {
          this.loadingLogin = true;
          this.errMess = error;
        });
  }
}
