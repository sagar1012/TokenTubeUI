import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../core-module/authguard/auth.guard';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { VideoComponent } from './admin/video/video.component';
import { CategoryComponent } from './admin/category/category.component';
import { TagsComponent } from './admin/tags/tags.component';
import { BannerComponent } from './admin/banner/banner.component';

const routes: Routes = [
  { path: 'admin', redirectTo: 'admin/admin-login', pathMatch: 'full' },
  { path: 'admin/admin-login', component: LoginComponent },
  {
    path: 'admin', component: AdminComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'video', component: VideoComponent, canActivate: [AuthGuard] },
      { path: 'category', component: CategoryComponent, canActivate: [AuthGuard] },
      { path: 'tag', component: TagsComponent, canActivate: [AuthGuard] },
      { path: 'banner', component: BannerComponent, canActivate: [AuthGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
