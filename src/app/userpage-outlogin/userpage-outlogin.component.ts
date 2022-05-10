import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-userpage-outlogin',
  templateUrl: './userpage-outlogin.component.html',
  styleUrls: ['./userpage-outlogin.component.css']
})
export class UserpageOutloginComponent implements OnInit {
  username: string;
  usuario: string;
  errMess: string;
  user: any;
  private storage: string = localStorage.getItem("ID");
  constructor(
    @Inject('baseURL') private baseURL,
    private route: ActivatedRoute,
    private userService: UsersService,
    private router: Router
  ) {
    this.router.events.subscribe((val: ActivatedRoute) => {
      // see also
      let checkParams = !val.snapshot ? null : val.snapshot.params
      this.usuario = !checkParams ? null : checkParams.username;
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.username = params.get("username");

      this.userService.userOutlogingFetch(this.username)
        .subscribe(res => {
          this.user = [res];
        }, err => this.router.navigate(['login']))
    });
  }
}
