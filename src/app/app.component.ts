import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  title = 'angular-dashboard';

  ngOnInit(): void {
    if (new Date().getTime() <= JSON.parse(localStorage.getItem("user")!)?.expirationDate) {
      this.authService.isLoggedIn = true;
      this.authService.user = JSON.parse(localStorage.getItem("user")!);
    } else {
      this.authService.isLoggedIn = false;
      this.authService.user = null;
    }
  }
}
