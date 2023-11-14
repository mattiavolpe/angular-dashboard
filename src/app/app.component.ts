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

          this.frameworkService.frameworks.forEach(framework => this.frameworkService.createFrameworkLinkBase(framework.id));
        },
        error: error => console.error(error)
      });

      this.dbService.getAllLinks().subscribe({
        next: fetchedLinks => {
          if (!fetchedLinks)
            return;
          
          Object.entries(fetchedLinks).forEach(entry => {            
            const frameworkLinkRef = this.frameworkService.frameworkLinks.find(fw => fw.frameworkId === entry[1].framework_id);

            frameworkLinkRef.links.push(
              {
                linkId: entry[0],
                linkName: entry[1].name,
                linkUrl: entry[1].link,
              }
            );
          });
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
