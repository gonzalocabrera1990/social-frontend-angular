import { Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../services/auth-guard.service';
import { AuthGuardTrueService as Auth } from '../services/auth-guard-true.service';
import { LoginComponent } from '../login/login.component';
import { SettingsComponent } from '../settings/settings.component';
import { UserComponent } from '../user/user.component';
import { HomeComponent } from '../home/home.component';
import { InboxComponent } from '../inboxDM/inbox/inbox.component';
import { SignupComponent } from '../signup/signup.component';
import { UserpageComponent } from '../userpage/userpage.component';
import { ImagesWallComponent } from '../images-wall/images-wall.component';
import { UsersStoriesComponent } from '../users-stories/users-stories.component';
import { UserStoryComponent } from '../user-story/user-story.component';
import { UserpageOutloginComponent } from '../userpage-outlogin/userpage-outlogin.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [Auth] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
    { path: 'userpage', component: UserComponent, canActivate: [AuthGuard] },
    { path: 'inbox', component: InboxComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent, canActivate: [Auth] },
    { path: 'view/imagenwall/:idimg', component: ImagesWallComponent, canActivate: [AuthGuard] },
    { path: 'users/:username/:user', component: UserpageComponent, canActivate: [AuthGuard] },
    { path: 'stories/:userId/:story', component: UsersStoriesComponent, canActivate: [AuthGuard] },
    { path: 'stories-user-wall/:userId', component: UserStoryComponent, canActivate: [AuthGuard] },
    { path: ':username', component: UserpageOutloginComponent , canActivate: [Auth] }
];
