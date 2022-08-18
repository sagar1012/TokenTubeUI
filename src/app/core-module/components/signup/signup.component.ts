import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { NotifierService } from 'angular-notifier';
import { AuthService } from '../../../core-module/authguard/auth.service';

import * as myGlobals from "../../../globals";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm !: FormGroup;
  submitted: boolean = false;
  isPasswordHide: boolean = false;
  isConfirmPasswordHide: boolean = false;

  isSuccessful: boolean = false;
  isSignUpFailed: boolean = false;
  errorMessage: string = "";

  private readonly notifier: NotifierService;

  constructor(private authService: AuthService, notifierService: NotifierService, private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      first_name: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
      last_name: new FormControl(null, [Validators.required, Validators.maxLength(40)]),
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.maxLength(70)]),
      password: new FormControl(null, [Validators.required]),
      password_confirmation: new FormControl(null, Validators.required),
    })

    if (localStorage.getItem('loggedIn')) {
      // this.isLoggedIn = true;
      this.router.navigate(['/dashboard/home']);
    }
  }

  get f() {
    return this.signupForm.controls;
  }

  singUp() {
    let count = 0;
    // let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.submitted = true;

    // if (this.signupForm.controls['first_name'].value == "" || this.signupForm.controls['first_name'].value == null) {
    //   count++;
    //   // this.notifier.notify('error', 'First name is required.');
    // }

    // if (this.signupForm.controls['last_name'].value == "" || this.signupForm.controls['last_name'].value == null) {
    //   count++;
    //   // this.notifier.notify('error', 'Last name is required.');
    // }

    // if (this.signupForm.controls['email'].value == "" || this.signupForm.controls['email'].value == null) {
    //   count++;
    //   // this.notifier.notify('error', 'Email is required.');
    // }
    // else if (!EMAIL_REGEXP.test(this.signupForm.controls['email'].value)) {
    //   count++;
    //   // this.notifier.notify('error', 'Not a valid Email Id.');
    // }

    // if (this.signupForm.controls['password'].value == "" || this.signupForm.controls['password'].value == null) {
    //   count++;
    //   // this.notifier.notify('error', 'Password is required.');
    // }

    // if (this.signupForm.controls['password_confirmation'].value == "" || this.signupForm.controls['password_confirmation'].value == null) {
    //   count++;
    //   // this.notifier.notify('error', 'Confirm password is required.');
    // }
    // else if(this.signupForm.controls['password'].value != this.signupForm.controls['password_confirmation'].value) {
    //   count++;
    //   // this.notifier.notify('error', 'Confirm password is not same.');
    // }

    if (this.signupForm.invalid) {
      return;
    }
    else {
      let firstname = this.signupForm.controls['first_name'].value;
      let lastname = this.signupForm.controls['last_name'].value;
      let email = this.signupForm.controls['email'].value;
      let password = this.signupForm.controls['password'].value;
      let password_confirmation = this.signupForm.controls['password_confirmation'].value
      let username = firstname + " " + lastname;

      let registerForm: FormGroup;
      registerForm = this.formBuilder.group({
        name: [username],
        email: [email],
        password: [password],
        password_confirmation: [password_confirmation],
      });

      /** spinner starts **/
      myGlobals.setLoadingData(true);

      this.authService.register(registerForm.value).subscribe({
        next: data => {
          // console.log(data);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.notifier.notify('success', 'Your sign up form submitted succesfully');
          this.signupForm.reset();

          /** spinner ends **/
          setTimeout(() => { myGlobals.setLoadingData(false), this.router.navigate(['/login']) }, 100);
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

          this.isSignUpFailed = true;
          // this.signupForm.reset();
          /** spinner ends **/
          setTimeout(() => { myGlobals.setLoadingData(false), this.router.navigate(['/signup']) }, 100);
        }
      });
    }
  }

  isNotMatched: boolean = false;
  pass = ''; conpass = '';

  NotMatched(value: any, item: any) {
    if (item == 'pass')
      this.pass = value.value;

    if (item == 'conpass')
      this.conpass = value.value;

    if (this.pass == this.conpass) {
      return this.isNotMatched = false;
    } else {
      return this.isNotMatched = true;
    }
  }

}
