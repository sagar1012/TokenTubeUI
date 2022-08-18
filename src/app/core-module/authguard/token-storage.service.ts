import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private issuer = {
    adminlogin: 'http://127.0.0.1:8000/api/auth/admin-login',
    login: 'http://127.0.0.1:8000/api/auth/login',
    register: 'http://127.0.0.1:8000/api/auth/register',
  };

  constructor() {}

  handleData(token: any) {
    localStorage.setItem('auth_token', token);
    // console.log("Called 4 : " + localStorage.getItem('auth_token'));
  }

  getToken() {
    // console.log("Called 5 : " + localStorage.getItem('auth_token'));
    return localStorage.getItem('auth_token');
  }

  // Verify the token
  isValidToken() {
    const token = this.getToken();
    // console.log("Called 7 : " + localStorage.getItem('auth_token'));
    if(localStorage.getItem('loggedIn') === 'true') {
      return true;
    }
    else if(localStorage.getItem('adminLoggedIn') === 'true') {
      return true;
    } 
    else {
      if (token) {
        const payload = this.payload(token);
        // console.log("Called 8 : " + payload);
        if (payload) {
          return Object.values(this.issuer).indexOf(payload.iss) > -1 ? true : false;
        }
      }
    }  
    return false;
  }

  payload(token: any) {
    const jwtPayload = token.split('.')[1];
    return JSON.parse(atob(jwtPayload));
  }

  // User state based on valid token
  isLoggedIn() {
    return this.isValidToken();
  }

  // Remove token
  removeToken() {
    localStorage.removeItem('auth_token');
  }
}
