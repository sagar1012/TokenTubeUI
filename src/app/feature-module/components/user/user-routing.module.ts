import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserprofileComponent } from '../user/user-profile/userprofile.component';
import { UserDashboardComponent } from '../user/user-dashboard/user-dashboard.component';
import { UserComponent } from './user.component';
import { PersonlizeComponent } from './personlize/personlize.component';
import { UploadComponent } from './upload/upload.component';
import { ViewCommentsComponent } from './view-comments/view-comments.component';
import { UserPlaylistComponent } from './user-playlist/user-playlist.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      { path: 'user-dashboard', component: UserDashboardComponent },
      { path: 'user-profile', component: UserprofileComponent },
      { path: 'personlize', component: PersonlizeComponent },
      { path: 'upload', component: UploadComponent },
      { path: 'viewcomment', component: ViewCommentsComponent },
      { path: 'user-playlist', component: UserPlaylistComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
