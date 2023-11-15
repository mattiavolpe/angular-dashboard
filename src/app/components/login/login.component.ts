import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DbService } from 'src/app/services/db.service';
import { ERROR_MESSAGES } from 'src/app/data/error-messages.data';
import { FrameworkService } from 'src/app/services/framework.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private dbService: DbService, private authService: AuthService, private router: Router, private frameworkService: FrameworkService) {}

  hide = true;
  error = {
    status: false,
    message: ""
  };

  handleLogin(form: NgForm) {
    this.error.status = false;
    this.error.message = "";

    this.frameworkService.frameworkLinks = [];

    const email = form.value.email;
    const password = form.value.password;

    this.dbService.loginUser(email, password).subscribe({
      next: (data: any) => {
        this.authService.setUserAsLogged(data.email, data.localId, data.idToken, data.expiresIn);

        this.dbService.getFrameworks().subscribe({
          next: data => {
            if (!data) {
              this.router.navigate(["/"]);
              return;
            }

            this.frameworkService.syncFrameworks(data);

            this.frameworkService.frameworks.forEach(framework => this.frameworkService.createFrameworkLinkBase(framework.id));

            this.router.navigate(["/"]);
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
      },
      error: error => {
        this.error.status = true;
        this.error.message = ERROR_MESSAGES.login[error.error.error.message] || error.error.error.message;
      }
    });
  }
}
