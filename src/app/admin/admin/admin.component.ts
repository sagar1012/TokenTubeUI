import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { AuthStateService } from '../../core-module/authguard/auth-state.service';
import { TokenStorageService } from '../../core-module/authguard/token-storage.service';
import { NotifierService } from 'angular-notifier';

declare let $: any;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild('widgetsContent') widgetsContent!: ElementRef;
  @ViewChild('sideBarContent') sideBarContent!: ElementRef;

  isAdminLoggedIn: boolean = false;
  showHideMenu: boolean = false;
  showHideUserMenu: boolean = false;
  isDashboard: string = "hidden";
  username: any = "";

  private readonly notifier: NotifierService;

  constructor(private authService: AuthStateService, private tokenStorage: TokenStorageService, notifierService: NotifierService, private router: Router) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    if (localStorage.getItem('adminLoggedIn')) {
      this.isAdminLoggedIn = true;
      this.username = localStorage.getItem("adminname");
    }
  }

  showHideSidebar() {
    if (this.showHideMenu == false) {
      $('body').css('overflow', 'hidden');
      this.showHideMenu = true;
    }
    else {
      $('body').css('overflow', 'auto');
      this.showHideMenu = false;
    }
  }

  userMenuOpen() {
    if (this.showHideUserMenu == false) {
      this.showHideUserMenu = true;
      $('body').css('overflow', 'hidden');
    } else {
      this.showHideUserMenu = false;
      $('body').css('overflow', 'auto');
    }
  }

  // Signout
  signOut() {
    this.authService.setAuthState(false);
    this.tokenStorage.removeToken();
    localStorage.clear();
    this.notifier.notify('success', 'You have login out successfully');
    // this.router.navigate(['/admin/admin-login']);
  }

}
