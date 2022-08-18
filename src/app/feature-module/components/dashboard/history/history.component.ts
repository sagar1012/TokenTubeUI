import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  isLoggedIn: boolean = false;
  watchChecked:boolean = true;
  communityChecked:boolean = false;
  username: any = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('loggedIn')) {
      this.isLoggedIn = true;
      this.username = localStorage.getItem("username");
    }
  }

  onItemChange(event: any){
    let value = event.target.value;
    if(value == 1) {
      this.watchChecked = true;
      this.communityChecked = false
    } 
    if(value == 2) {
      this.communityChecked = true;
      this.watchChecked = false;
    }
 }

 setHistoryLoginIn() {
    localStorage.setItem('historyLoggedIn', 'true');
    this.router.navigate(['/login']);
 }

}
