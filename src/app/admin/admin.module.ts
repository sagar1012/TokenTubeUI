import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { VideoComponent } from './admin/video/video.component';
import { CategoryComponent } from './admin/category/category.component';
import { TagsComponent } from './admin/tags/tags.component';
import { BannerComponent } from './admin/banner/banner.component';


@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    DashboardComponent,
    VideoComponent,
    CategoryComponent,
    TagsComponent,
    BannerComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    NgbModule
  ]
})
export class AdminModule { }
