import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare let $: any;
@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {
  isManage: boolean = false;
  isGrid: boolean = true;
  isList: boolean = false;
  isLoggedIn: boolean = false;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('loggedIn')) {
      this.isLoggedIn = true;
    }
  }

  manage() {
    this.isManage = true;
    this.isGrid = false;
    this.isList = false;
  }

  grid() {
    this.isGrid = true;
    this.isList = false;
    this.isManage = false;
  }

  list() {
    this.isList = true;
    this.isManage = false;
    this.isGrid = false;
  }

  setSubscriptionLoginIn() {
    localStorage.setItem('subscriptionLoggedIn', 'true');
    this.router.navigate(['/login']);
  }

}
