import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.module';
import { AuthService } from '../services/auth.service';
import { SearchService } from '../services/search.service';
import { UsersService } from '../services/users.service';
import { Notifications, NotificationResponse } from '../models/notifications.model';
import { Inbox } from '../models/inbox.model';
import { InboxService } from '../services/inbox.service';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private storage: string = localStorage.getItem("ID");
  searchTerm: string = "";
  usuario: string;
  visibled: boolean;
  searchResults: User[];
  user: User;
  errMess: string;
  notificationStyle: boolean = false;
  notificationStatus: boolean = false;
  navbarStyle: boolean = false;
  notifications: Notifications[];
  inbox: Inbox[];
  inboxStatus: boolean;
  colorful: string = "red";
  constructor(
    @Inject('baseURL') private baseURL,
    private userService: UsersService,
    private store: Store<AppState>,
    private auths: AuthService,
    private search: SearchService,
    private inboxService: InboxService,
    private router: Router
  ) {


    this.store.select(state => state.auth)
      .subscribe(data => {
        this.visibled = data.isAuthenticated;
        this.usuario = data.isAuthenticated ? localStorage.getItem('CREDS').split('@')[0] : null;
        if (data.isAuthenticated) {
          let socketInfo = {
            id: localStorage.getItem('ID'),
            name: localStorage.getItem('CREDS')
          }
          this.inboxService.socketconection(socketInfo)
            .subscribe(res => {
              this.inboxStatusHandle();
            })
        }
      }, err => this.errMess = err)


    this.store.select(state => state.user)
      .subscribe(data => {
        this.user = data.user
      }, err => this.errMess = err)
    this.router.events.subscribe((val: NavigationEnd) => {
      this.visibled = localStorage.getItem("JWT") ? true : false;
    })
  }

  ngOnInit() {
    if (localStorage.getItem("JWT")) {
      this.inboxService.inboxFetch()
        .subscribe(res => {
          if (res) {
            this.inboxStatus = res.some(i => i.talk.some(t => t.author !== this.storage && t.seen === false))
          }
        }, err => this.errMess = err)

      this.userService.userLogFetch()
        .subscribe(res => {
        }, err => this.errMess = err)

      this.userService.fetchNotifications()
        .subscribe(res => {
          let socketInfo = {
            id: localStorage.getItem('ID'),
            name: localStorage.getItem('CREDS')
          }
          this.inboxService.socketconection(socketInfo)
            .subscribe(res => {
              this.inboxStatusHandle();
            })
        }, err => this.errMess = err)
    }

    this.store.select(state => state.inbox)
      .subscribe(data => {
        this.inbox = data.inbox;
        this.inboxStatusHandle()
      }, err => this.errMess = err)


    this.store.select(state => state.user)
      .subscribe(data => {
        this.user = data.user
      }, err => this.errMess = err)


    this.store.select(state => state.notifications)
      .subscribe(data => {
        this.notifications = data.notifications;
        this.store.select(state => state.notifications)
          .subscribe(data => {
            this.notificationStatus = !data.notifications ? null : data.notifications.some(n => n.readstatus === false)
          }, err => this.errMess = err)
      }, err => this.errMess = err)

    this.inboxService.socketIoConection('chatNotification')
      .subscribe(data => {
        let index = this.inbox.findIndex(i => i._id === data._id)
        this.inbox[index] = data;
        this.inboxStatusHandle()
      })
  }
  inboxStatusHandle() {
    this.storage = localStorage.getItem("ID");
    if (this.inbox && this.storage) {
      this.inboxStatus = this.inbox.some(i => i.talk.some(t => t.author !== this.storage && t.seen === false))
    }
  }



  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.navbarStyle = false;

  }
  notify(confirm: boolean, followerId: string, notiId: string) {
    const dataNotification: NotificationResponse = {
      action: confirm,
      followerId: followerId,
      notiId: notiId
    }
    this.userService.friendRequestResponse(dataNotification)
      .subscribe(res => {
        window.location.reload();
      })
  }
  readNotification() {
    this.userService.notificationsReadstatus()
      .subscribe(data => {
        this.notificationStatus = false;
      }, err => this.errMess = err)
  }
  show() {
    this.notificationStyle = !this.notificationStyle
    if (this.notificationStatus) {
      this.readNotification();
    }
  }
  read() {
    this.inboxStatus = false;
    this.colorful = 'inherit';
    this.navbarStyle = false;
  }
  shownav() {
    this.navbarStyle = !this.navbarStyle
  }
  hidenav() {
    this.navbarStyle = false;
  }
  searching(value: string) {
    if (this.navbarStyle) this.navbarStyle = false;
    if (value) {
      this.search.handleSearch(value)
        .subscribe(res => {
          let current = res[0] ? res : null;
          this.searchResults = current;
        })
    } else {
      this.searchResults = null;
    }
  }
  clean() {
    this.searchTerm = "";
    this.searchResults = null;
  }
  logout() {
    this.navbarStyle = false;
    this.visibled = false;
    this.user = null;
    this.auths.destroyUserCredentials();
  }
}
