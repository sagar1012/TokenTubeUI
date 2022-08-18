import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { Router, Event, NavigationEnd } from '@angular/router';

import { AuthStateService } from '../../../core-module/authguard/auth-state.service';
import { TokenStorageService } from '../../../core-module/authguard/token-storage.service';
import { NotifierService } from 'angular-notifier';


declare let $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild('widgetsContent') widgetsContent!: ElementRef;
  @ViewChild('sideBarContent') sideBarContent!: ElementRef;

  isMenu: string = "home";
  isLoggedIn: boolean = false;
  showHideMenu: boolean = false;
  showHideUserMenu: boolean = false;
  isDashboard: string = "hidden";
  screenWidth: any;
  username: any = "";

  private readonly notifier: NotifierService;

  constructor(private authService: AuthStateService, private tokenStorage: TokenStorageService, notifierService: NotifierService, private router: Router) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.screenWidth = screen.width;

    if (this.router.url === "/dashboard/home"
      || this.router.url === "/dashboard/channel"
      || this.router.url === "/dashboard/explore"
      || this.router.url === "/dashboard/shorts"
      || this.router.url === "/dashboard/subscriptions"
      || this.router.url === "/dashboard/library"
      || this.router.url === "/dashboard/history"
      || this.router.url === "/dashboard/trending"
      || this.router.url === "/dashboard/music") {
      this.isDashboard = "visible";
      this.isMenu = this.router.url.substring(this.router.url.indexOf("/", this.router.url.indexOf("/") + 1) + 1);
    }

    if (localStorage.getItem('loggedIn')) {
      this.isLoggedIn = true;
      this.username = localStorage.getItem("username");
    }

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        if (event.url !== "/dashboard/home"
          && event.url !== "/dashboard/channel"
          && event.url !== "/dashboard/explore"
          && event.url !== "/dashboard/shorts"
          && event.url !== "/dashboard/subscriptions"
          && event.url !== "/dashboard/library"
          && event.url !== "/dashboard/history"
          && event.url !== "/dashboard/trending"
          && event.url !== "/dashboard/music") {
          this.sideBarContent.nativeElement.style.visibility = "hidden";
          this.isMenu = event.url.substring(event.url.indexOf("/", event.url.indexOf("/") + 1) + 1);
        } else {
          this.sideBarContent.nativeElement.style.visibility = "visible";
          this.isMenu = event.url.substring(event.url.indexOf("/", event.url.indexOf("/") + 1) + 1);
        }
      }
    });
  }

  scrollLeft() {
    this.widgetsContent.nativeElement.scrollLeft -= 150;
  }

  scrollRight() {
    this.widgetsContent.nativeElement.scrollLeft += 150;
  }

  showHideSidebar() {
    if (this.router.url === "/dashboard/home"
      || this.router.url === "/dashboard/channel"
      || this.router.url === "/dashboard/explore"
      || this.router.url === "/dashboard/shorts"
      || this.router.url === "/dashboard/subscriptions"
      || this.router.url === "/dashboard/library"
      || this.router.url === "/dashboard/history"
      || this.router.url === "/dashboard/trending"
      || this.router.url === "/dashboard/music") {
      this.isDashboard = "visible";
      if (this.showHideMenu == false) {
        $('body').css('overflow', 'hidden');
        this.showHideMenu = true;
      }
      else {
        $('body').css('overflow', 'auto');
        this.showHideMenu = false;
      }
    } else {
      this.isDashboard = "hidden";
      if (this.showHideMenu == false) {
        this.showHideMenu = true;
        $('body').css('overflow', 'hidden');
      } else {
        this.showHideMenu = false;
        $('body').css('overflow', 'auto');
      }
    }
  }

  userMenuOpen() {
    if (this.showHideUserMenu == false) {
      this.showHideUserMenu = true;
      // $('body').css('overflow', 'hidden');
    } else {
      this.showHideUserMenu = false;
      $(".dropdown-menu").removeClass("show");
      // $('body').css('overflow', 'auto');
    }
  }

  activeMenu(menu: any) {
    if (menu == "home") {
      this.isMenu = "home";
    }
    else if (menu == "explore") {
      this.isMenu = "explore";
    }
    else if (menu == "shorts") {
      this.isMenu = "shorts";
    }
    else if (menu == "subscriptions") {
      this.isMenu = "subscriptions";
    }
    else if (menu == "library") {
      this.isMenu = "library";
    }
    else if (menu == "history") {
      this.isMenu = "history";
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
    setTimeout(() => this.router.navigate(['/dashboard/home']), 5000);
  }

}
