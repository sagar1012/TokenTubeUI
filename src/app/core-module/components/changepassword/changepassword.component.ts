import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { NotifierService } from 'angular-notifier';
import { AuthService } from '../../../core-module/authguard/auth.service';

import * as myGlobals from "../../../globals";


@Component({
  selector: 'app-change-password',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm !: FormGroup;
  submitted: boolean = false;
  errorMessage: string = "";
  token: string = "";

  private readonly notifier: NotifierService;

  constructor(private authService: AuthService, notifierService: NotifierService, private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.notifier = notifierService;
  }


  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      email: new FormControl(null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.maxLength(70)]),
      password: new FormControl(null, [Validators.required]),
      password_confirmation: new FormControl(null, Validators.required),
      passwordToken: new FormControl(null),
    })

    if (localStorage.getItem('loggedIn')) {
      // this.isLoggedIn = true;
      this.router.navigate(['/dashboard/home']);
    }
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  changepswd() {
    let count = 0;
    // let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.submitted = true;

    // if (this.changePasswordForm.controls['email'].value == "" || this.changePasswordForm.controls['email'].value == null) {
    //   count++;
    //   // this.notifier.notify('error', 'Email is required.');
    // }
    // else if (!EMAIL_REGEXP.test(this.changePasswordForm.controls['email'].value)) {
    //   count++;
    //   // this.notifier.notify('error', 'Not a valid Email Id.');
    // }

    // if (this.changePasswordForm.controls['password'].value == "" || this.changePasswordForm.controls['password'].value == null) {
    //   count++;
    //   // this.notifier.notify('error', 'Password is required.');
    // }

    // if (this.changePasswordForm.controls['password_confirmation'].value == "" || this.changePasswordForm.controls['password_confirmation'].value == null) {
    //   count++;
    //   // this.notifier.notify('error', 'Confirm password is required.');
    // }
    // else if (this.changePasswordForm.controls['password'].value != this.changePasswordForm.controls['password_confirmation'].value) {
    //   count++;
    //   // this.notifier.notify('error', 'Confirm password is not same.');
    // }

    if (count > 0) {
      return;
    }
    else {
      let email = this.changePasswordForm.controls['email'].value;
      let password = this.changePasswordForm.controls['password'].value;
      let password_confirmation = this.changePasswordForm.controls['password_confirmation'].value

      this.token = this.route.snapshot.params['token'];
      let resetForm: FormGroup;
      resetForm = this.formBuilder.group({
        email: [email],
        password: [password],
        password_confirmation: [password_confirmation],
        passwordToken: this.token
      });

      // console.log(this.route.snapshot.params['token']);
      // console.log(resetForm.value);

      /** spinner starts **/
      myGlobals.setLoadingData(true);

      this.authService.resetPassword(resetForm.value).subscribe({
        next: data => {
          // console.log(data);
          this.notifier.notify('success', 'Password has been updated');
          this.changePasswordForm.reset();

          /** spinner ends **/
          setTimeout(() => { myGlobals.setLoadingData(false), this.router.navigate(['/login']) }, 100);
        },
        error: err => {
          // console.log(err);
          // console.log(err.error.message);
          // if (err.error.message !== undefined) {
          //   this.errorMessage = err.error.message;
          //   this.notifier.notify('error', this.errorMessage);
          // }

          // if (err.error.error !== undefined) {
          //   this.errorMessage = err.error.error;
          //   this.notifier.notify('error', this.errorMessage);
          // }

          // this.changePasswordForm.reset();
          /** spinner ends **/
          setTimeout(() => { myGlobals.setLoadingData(false) }, 100);
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
