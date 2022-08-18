import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';

import { Router } from '@angular/router';

import { AuthStateService } from './core-module/authguard/auth-state.service';
import { TokenStorageService } from './core-module/authguard/token-storage.service';
import { NotifierService } from 'angular-notifier';


import * as myGlobals from "./globals";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app-comman-structure';
  isSignedIn!: boolean;

  private readonly notifier: NotifierService;

  constructor(private authService: AuthStateService, private tokenStorage: TokenStorageService, notifierService: NotifierService, private router: Router) { 
    this.notifier = notifierService;
  }

  // @HostListener("window:onbeforeunload",["$event"])
  // clearLocalStorage(event: any) {
  //   // console.log("Called 1 : " + this.tokenStorage.getToken());
  //   this.authService.setAuthState(false);
  //   this.tokenStorage.removeToken();
  // }

  // @HostListener('window:beforeunload') 
  // goToPage() {
  //   // console.log("Called 2 : " + this.tokenStorage.getToken());
  //   this.authService.userAuthState.subscribe((val) => {
  //     this.isSignedIn = val;
  //   });
  // }

  ngOnInit(): void {
    /** spinner starts **/
    myGlobals.setLoadingData(true);
    
    /** spinner ends **/
    setTimeout(() => myGlobals.setLoadingData(false), 3000);

    // let tokenStatus = this.tokenStorage.isValidToken();
    // console.log("Called 3 : " + tokenStatus);

    this.authService.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
      // console.log("Called : " + this.isSignedIn);
    });
  }

  get loadingData(){
    return myGlobals.loading;
  }

  // Signout
  signOut() {
    this.authService.setAuthState(false);
    this.tokenStorage.removeToken();
    this.notifier.notify('success', 'You have login out successfully');
    this.router.navigate(['/login']);
  }

}
