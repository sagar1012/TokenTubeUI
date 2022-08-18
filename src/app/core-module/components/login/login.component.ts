import { HttpClient } from '@angular/common/http';
import { Component, OnInit, HostListener } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core-module/authguard/auth.service';
import { AuthStateService } from '../../../core-module/authguard/auth-state.service';
import { TokenStorageService } from '../../../core-module/authguard/token-storage.service';
import { NotifierService } from 'angular-notifier';

import * as myGlobals from "../../../globals";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm !: FormGroup;
  submitted: boolean = false;

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  private readonly notifier: NotifierService;

  constructor(private authService: AuthService, private authState: AuthStateService,
    private tokenStorage: TokenStorageService, notifierService: NotifierService,
    private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.notifier = notifierService;
  }

  // @HostListener("window:onbeforeunload",["$event"])
  // clearLocalStorage(event: any){
  //   this.authState.setAuthState(false);
  //   this.tokenStorage.removeToken();
  // }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.maxLength(70)]),
      password: new FormControl(null, [Validators.required])
    })

    if (localStorage.getItem('loggedIn')) {
      this.isLoggedIn = true;
      this.router.navigate(['/dashboard/home']);
    }
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    let count = 0;
    // let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.submitted = true;

    // if (this.loginForm.controls['email'].value == "" || this.loginForm.controls['email'].value == null) {
    //   count++;
    //   // this.notifier.notify('error', 'Email is required.');
    // }
    // else if (!EMAIL_REGEXP.test(this.loginForm.controls['email'].value)) {
    //   count++;
    //   // this.notifier.notify('error', 'Not a valid Email Id.');
    // }

    // if (this.loginForm.controls['password'].value == "" || this.loginForm.controls['password'].value == null) {
    //   count++;
    //   // this.notifier.notify('error', 'Password is required.');
    // }

    if (this.loginForm.invalid) {
      return;
    }
    else {
      let username = this.loginForm.controls['email'].value;
      let password = this.loginForm.controls['password'].value;

      let loginFormData: FormGroup;
      loginFormData = this.formBuilder.group({
        email: [username],
        password: [password]
      });

      /** spinner starts **/
      myGlobals.setLoadingData(true);

      this.authService.login(loginFormData.value).subscribe({
        next: data => {
          // console.log(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          localStorage.setItem('loggedIn', 'true');

          if (localStorage.getItem('historyLoggedIn') && localStorage.getItem('loggedIn')) {
            this.router.navigate(['/dashboard/history']);
          }
          else if (localStorage.getItem('libraryLoggedIn') && localStorage.getItem('loggedIn')) {
            this.router.navigate(['/dashboard/library']);
          }

          else if (localStorage.getItem('subscriptionLoggedIn') && localStorage.getItem('loggedIn')) {
            this.router.navigate(['/dashboard/subscriptions']);
          }
          else if (data.accessToken) {
            this.router.navigate(['/dashboard/home']);
          }

          this.notifier.notify('success', 'You have login successfully');
          this.responseHandler(data);
          this.loginForm.reset();
          this.authState.setAuthState(true);

          /** spinner ends **/
          setTimeout(() => { myGlobals.setLoadingData(false) }, 100);
        },
        error: err => {
          // console.log(err.error);
          // if (err.error.email !== undefined) {
          //   this.errorMessage = err.error.email;
          //   this.notifier.notify('error', this.errorMessage);
          // }

          // if (err.error.password !== undefined) {
          //   this.errorMessage = err.error.password;
          //   this.notifier.notify('error', this.errorMessage);
          // }

          // if (err.error.error !== undefined) {
          //   this.errorMessage = err.error.error;
          //   this.notifier.notify('error', this.errorMessage);
          // }

          this.isLoginFailed = true;

          /** spinner ends **/
          setTimeout(() => { myGlobals.setLoadingData(false), this.router.navigate(['/login']) }, 100);
        }
      });
    }
  }

  // Handle response
  responseHandler(data: any) {
    this.tokenStorage.handleData(data.access_token);
    localStorage.setItem("username", data.username);
    // console.log("Called 9 : " + data.access_token);
  }
}
