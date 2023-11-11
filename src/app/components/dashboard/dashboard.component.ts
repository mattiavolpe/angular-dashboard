import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logoutUser() {
    this.authService.user = null;
    this.authService.isLoggedIn = false;
    localStorage.removeItem("user");

    this.router.navigate(["/login"]);
  }
}
