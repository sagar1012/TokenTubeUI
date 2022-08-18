import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HeaderComponent } from '../../../comman-module/header/header.component';
import { PersonlizeComponent } from './personlize/personlize.component';
import { UploadComponent } from './upload/upload.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ViewCommentsComponent } from './view-comments/view-comments.component';
import { UserPlaylistComponent } from './user-playlist/user-playlist.component';


@NgModule({
  declarations: [
    UserComponent,
    HeaderComponent,
    PersonlizeComponent,
    UploadComponent,
    ViewCommentsComponent,
    UserPlaylistComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }
