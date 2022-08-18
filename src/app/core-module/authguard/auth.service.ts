import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://127.0.0.1:8000/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

// User interface
export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
  token!: String;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post(AUTH_API + 'login', user, httpOptions);
  }

  adminLogin(user: User): Observable<any> {
    return this.http.post(AUTH_API + 'admin-login', user, httpOptions);
  }

  register(user: User): Observable<any> {
    return this.http.post(AUTH_API + 'register', user, httpOptions);
  }

  sendResetPasswordLink(user: User): Observable<any> {
    return this.http.post(AUTH_API + 'reset-password-request', user, httpOptions);
  }

  resetPassword(user: User): Observable<any> {
    return this.http.post(AUTH_API + 'change-password', user, httpOptions);
  }

}
