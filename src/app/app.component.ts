import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { DbService } from './services/db.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private dbService: DbService) {}
  title = 'angular-dashboard';

  ngOnInit(): void {
    if (new Date().getTime() <= JSON.parse(localStorage.getItem("user")!)?.expirationDate) {
      this.authService.isLoggedIn = true;

      const savedUser = JSON.parse(localStorage.getItem("user")!);
      
      this.authService.user = new User(savedUser.email, savedUser.localId, savedUser.idToken, savedUser.expirationDate);

      this.dbService.getFrameworks().subscribe(data => {
        console.log(data);
      }, error => {
        console.error(error);
      });

      // this.dbService.saveFramework("VueJs").subscribe(data => {
      //   console.log(data);
      // });
    } else {
      this.authService.isLoggedIn = false;
      this.authService.user = null;
      localStorage.removeItem("user");
    }
  }
}
