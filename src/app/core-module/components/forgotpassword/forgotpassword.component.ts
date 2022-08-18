import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { NotifierService } from 'angular-notifier';
import { AuthService } from '../../../core-module/authguard/auth.service';

import * as myGlobals from "../../../globals";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public forgotForm !: FormGroup;
  submitted: boolean = false;
  errorMessage: string = "";

  private readonly notifier: NotifierService;

  constructor(private authService: AuthService, notifierService: NotifierService, private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.notifier = notifierService;
  }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.maxLength(70)])
    })

    if (localStorage.getItem('loggedIn')) {
      // this.isLoggedIn = true;
      this.router.navigate(['/dashboard/home']);
    }
  }

  get f() {
    return this.forgotForm.controls;
  }

  forgotpswd() {
    let count = 0;
    // let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.submitted = true;

    // if (this.forgotForm.controls['email'].value == "" || this.forgotForm.controls['email'].value == null) {
    //   count++;
    //   // this.notifier.notify('error', 'Email is required.');
    // }
    // else if (!EMAIL_REGEXP.test(this.forgotForm.controls['email'].value)) {
    //   count++; else if this.notifier 
    //   // this.notifier.notify('error', 'Not a valid Email Id.');
    // }

    if (count > 0) {
      return;
    }
    else {
      let email = this.forgotForm.controls['email'].value;

      let resetForm: FormGroup;
      resetForm = this.formBuilder.group({
        email: [email],
      });
      // console.log("Called");
      /** spinner starts **/
      myGlobals.setLoadingData(true);

      this.authService.sendResetPasswordLink(resetForm.value).subscribe({
        next: data => {
          // console.log(data);
          this.notifier.notify('success', data.message);
          this.forgotForm.reset();

          /** spinner ends **/
          setTimeout(() => { myGlobals.setLoadingData(false), this.router.navigate(['/login']) }, 100);
        },
        error: err => {
          // console.log(err.error);
          // if (err.error.message !== undefined) {
          //   this.errorMessage = err.error.message;
          //   this.notifier.notify('error', this.errorMessage);
          // }

          // this.forgotForm.reset();
          /** spinner ends **/
          setTimeout(() => { myGlobals.setLoadingData(false), this.router.navigate(['/forgotpassword']) }, 100);
        }
      });
    }
  }

}
