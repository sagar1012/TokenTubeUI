import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  isLoggedIn: boolean = false;
  username: any = "";

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('loggedIn')) {
      this.isLoggedIn = true;
      this.username = localStorage.getItem("username");
    }
  }

  setLibraryLoginIn() {
    localStorage.setItem('libraryLoggedIn', 'true');
    this.router.navigate(['/login']);
  }

}
