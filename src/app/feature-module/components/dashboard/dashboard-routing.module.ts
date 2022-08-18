import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../../../core-module/authguard/auth.guard';
import { PlaylistComponent } from './playlist/playlist.component';
import { VideoComponent } from './video/video.component';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component'
import { ChannelComponent } from './channel/channel.component';
import { ExploreComponent } from './explore/explore.component';
import { ShortsComponent } from './shorts/shorts.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { LibraryComponent } from './library/library.component';
import { HistoryComponent } from './history/history.component';
import { TrendingComponent } from './trending/trending.component';
import { MusicComponent } from './music/music.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'playlist', component: PlaylistComponent, canActivate: [AuthGuard] },
      { path: 'watch/video', component: VideoComponent, canActivate: [AuthGuard] },
      { path: 'channel', component: ChannelComponent, canActivate: [AuthGuard] },
      { path: 'explore', component: ExploreComponent },
      { path: 'shorts', component: ShortsComponent },
      { path: 'subscriptions', component: SubscriptionsComponent },
      { path: 'library', component: LibraryComponent },
      { path: 'history', component: HistoryComponent },
      { path: 'trending', component: TrendingComponent },
      { path: 'music', component: MusicComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
