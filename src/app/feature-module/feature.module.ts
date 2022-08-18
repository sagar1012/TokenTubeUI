import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { FeatureRoutingModule } from './feature-routing.modules';

import { DashboardModule } from './components/dashboard/dashboard.module'
import { UserModule } from './components/user/user.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    HttpClientModule,
    UserModule,
    DashboardModule
  ]
})
export class FeatureModule { }
