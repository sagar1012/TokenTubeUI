import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthStateService } from '../../core-module/authguard/auth-state.service';
import { TokenStorageService } from '../../core-module/authguard/token-storage.service';
import { NotifierService } from 'angular-notifier';

declare let $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  showHideUserMenu: boolean = false;
  username: any = "";

  private readonly notifier: NotifierService;

  constructor(private authService: AuthStateService, private tokenStorage: TokenStorageService, notifierService: NotifierService, private router: Router) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    if (localStorage.getItem('loggedIn')) {
      this.isLoggedIn = true;
      this.username = localStorage.getItem("username");
    }
  }

  userMenuOpen() {
    if (this.showHideUserMenu == false) {
      this.showHideUserMenu = true;
      $('body').css('overflow', 'hidden');
    } else {
      this.showHideUserMenu = false;
      $(".dropdown-menu").removeClass("show");
      $('body').css('overflow', 'auto');
    }
  }

  // Signout
  signOut() {
    this.userMenuOpen();
    this.authService.setAuthState(false);
    this.tokenStorage.removeToken();
    localStorage.clear();
    this.isLoggedIn = false;
    this.notifier.notify('success', 'You have login out successfully');
    // setTimeout(() => this.router.navigate(['/dashboard/home']), 5000);
  }


}
