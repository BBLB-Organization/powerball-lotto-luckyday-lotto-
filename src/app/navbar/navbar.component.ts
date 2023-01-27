import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  navbarWindow: any;

  isMenuCollapsed: boolean = true;
  isAuthenticated: boolean = false;

  logoutUser(): void {
    localStorage.clear();
    this.navbarWindow.location.reload();
  }

  constructor(private router: Router) {
    this.navbarWindow = window;
  }

  ngOnInit(): void {
    if (localStorage.getItem("accessToken") != null) {
      this.isAuthenticated = true;
    }
    else {
      this.isAuthenticated = false;
      this.router.navigate(['/login']);
    }
  }

}
