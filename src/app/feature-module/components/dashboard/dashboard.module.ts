import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { VideoComponent } from './video/video.component';
import { HomeComponent } from './home/home.component';
import { ChannelComponent } from './channel/channel.component';
import { ExploreComponent } from './explore/explore.component';
import { ShortsComponent } from './shorts/shorts.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { LibraryComponent } from './library/library.component';
import { HistoryComponent } from './history/history.component';
import { TrendingComponent } from './trending/trending.component';
import { MusicComponent } from './music/music.component';
import { SettingsComponent } from './settings/settings.component';


@NgModule({
  declarations: [
    DashboardComponent,
    PlaylistComponent,
    VideoComponent,
    HomeComponent,
    ChannelComponent,
    ExploreComponent,
    ShortsComponent,
    SubscriptionsComponent,
    LibraryComponent,
    HistoryComponent,
    TrendingComponent,
    MusicComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
