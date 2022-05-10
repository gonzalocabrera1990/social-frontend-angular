import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MatToolbarModule, MatButtonModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule as NgRxStoreModule, ActionReducerMap } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing/app-routing.module';

import 'hammerjs';
import { ModalComponent } from './modal/modal.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { UserComponent } from './user/user.component';
import { InboxComponent } from './inboxDM/inbox/inbox.component';
import { SignupComponent } from './signup/signup.component';
import { UserpageComponent } from './userpage/userpage.component';
import { SearchComponent } from './search/search.component';

import { intializeAuthState, AuthState, reducerAuth } from './models/auth-state.model';
import { intializeUserState, UserState, reducerUser } from './models/user-state.model';
import { intializeFollowersState, FollowersState, reducerFollowers } from './models/followers-state.model';
import { intializeFollowingState, FollowingState, reducerFollowing } from './models/following-state.model';
import { intializeContentState, ContentState, reducerContent } from './models/content-state.model';
import { intializeOtherUserState, OtherUserState, reducerOtherUser } from './models/otherusers-state.model';
import { intializeLikesState, LikesState, reducerLikes } from './models/likes-state.model';
import { intializeNotificationsState, NotificationsState, reducerNotifications } from './models/notifications-state.model';
import { intializeInboxState, InboxState, reducerInbox } from './models/inbox-state.model';
import { intializeStoriesState, StoriesState, reducerStories } from './models/stories-state.model';

import { AuthApiClient } from './models/auth-api-client.model';

import { HttpClientModule } from '@angular/common/http';

import { baseURL } from './shared/baseurl';
import { countries } from './shared/countries';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { AuthInterceptor, UnauthorizedInterceptor } from './services/auth.interceptor';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthGuardTrueService } from './services/auth-guard-true.service';
import { ContentService } from './services/content.service';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StartItemsComponent } from './start-items/start-items.component';
import { FollowTabComponent } from './follow-tab/follow-tab.component';
import { ImagesModalComponent } from './images-modal/images-modal.component';
import { CommentsState, reducerComments, intializeCommentsState } from './models/comment-state.model';
import { FriendsViewComponent } from './inboxDM/friends-view/friends-view.component';
import { TalksViewComponent } from './inboxDM/talks-view/talks-view.component';
import { ChatViewComponent } from './inboxDM/chat-view/chat-view.component';
import { LikesModalComponent } from './modals/likes-modal/likes-modal.component';
import { ProfileimageuploadModalComponent } from './modals/profileimageupload-modal/profileimageupload-modal.component';
import { InboxService } from './services/inbox.service';
import { TalkComponent } from './inboxDM/talks-view/talk/talk.component';
import { UserStoryComponent } from './user-story/user-story.component';
import { UsersStoriesComponent } from './users-stories/users-stories.component';
import { StartStoryComponent } from './start-story/start-story.component';
import { ImagesWallComponent } from './images-wall/images-wall.component';
import { WarningModalComponent } from './warning-modal/warning-modal.component';
import { PosterComponent } from './poster/poster.component';
import { UserpageOutloginComponent } from './userpage-outlogin/userpage-outlogin.component';

// redux init
export interface AppState {
  auth: AuthState;
  user: UserState;
  content: ContentState;
  otheruser: OtherUserState;
  followers: FollowersState;
  following: FollowingState;
  likes: LikesState;
  comments: CommentsState;
  notifications: NotificationsState;
  inbox: InboxState;
  stories: StoriesState;
};

const reducers: ActionReducerMap<AppState> = {
  auth: reducerAuth,
  user: reducerUser,
  content: reducerContent,
  otheruser: reducerOtherUser,
  following: reducerFollowing,
  followers: reducerFollowers,
  likes: reducerLikes,
  comments: reducerComments,
  notifications: reducerNotifications,
  inbox: reducerInbox,
  stories: reducerStories
};

const reducersInitialState = {
  auth: intializeAuthState(),
  user: intializeUserState(),
  content: intializeContentState(),
  otheruser: intializeOtherUserState(),
  followers: intializeFollowersState(),
  following: intializeFollowingState(),
  likes: intializeLikesState(),
  comments: intializeCommentsState(),
  notifications: intializeNotificationsState(),
  inbox: intializeInboxState(),
  stories: intializeStoriesState()
};
// fin redux init



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    ModalComponent,
    HomeComponent,
    SettingsComponent,
    UserComponent,
    InboxComponent,
    SignupComponent,
    UserpageComponent,
    SearchComponent,
    StartItemsComponent,
    FollowTabComponent,
    ImagesModalComponent,
    FriendsViewComponent,
    TalksViewComponent,
    ChatViewComponent,
    LikesModalComponent,
    ProfileimageuploadModalComponent,
    UserpageOutloginComponent,
    PosterComponent,
    WarningModalComponent,
    ImagesWallComponent,
    StartStoryComponent,
    UsersStoriesComponent,
    UserStoryComponent,
    TalkComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgRxStoreModule.forRoot(reducers, { initialState: reducersInitialState }),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    AuthApiClient,
    { provide: 'baseURL', useValue: baseURL },
    { provide: 'countries', useValue: countries },
    { provide: Window , useValue: window },
    ProcessHTTPMsgService,
    AuthService,
    UsersService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    AuthGuardService,
    AuthGuardTrueService,
    ContentService,
    InboxService
  ],
  entryComponents: [
    ModalComponent,
    ImagesModalComponent,
    LikesModalComponent,
    ProfileimageuploadModalComponent,
    WarningModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
