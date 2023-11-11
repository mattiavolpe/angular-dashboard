import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { DbService } from './services/db.service';
import { User } from './models/user.model';
import { FrameworkService } from './services/framework.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private dbService: DbService, public frameworkService: FrameworkService) {}
  title = 'angular-dashboard';

  ngOnInit(): void {
    if (new Date().getTime() <= JSON.parse(localStorage.getItem("user")!)?.expirationDate) {
      this.authService.isLoggedIn = true;

      const savedUser = JSON.parse(localStorage.getItem("user")!);
      
      this.authService.user = new User(savedUser.email, savedUser.localId, savedUser.idToken, savedUser.expirationDate);

      this.dbService.getFrameworks().subscribe({
        next: data => {
          if (!data)
            return;
          
          this.frameworkService.syncFrameworks(data);
        },
        error: error => console.error(error)
      });
    } else {
      this.authService.isLoggedIn = false;
      this.authService.user = null;
      localStorage.removeItem("user");
    }
  }
}
