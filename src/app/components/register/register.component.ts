import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DbService } from 'src/app/services/db.service';
import { ERROR_MESSAGES } from 'src/app/data/error-messages.data';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private dbService: DbService, private authService: AuthService, private router: Router) {}

  hide = true;
  error = {
    status: false,
    message: ""
  };

  handleRegister(form: NgForm) {
    this.error.status = false;
    this.error.message = "";

    const email = form.value.email;
    const password = form.value.password;

    this.dbService.registerUser(email, password).subscribe((data: any) => {
      this.authService.setUserAsLogged(data.email, data.localId, data.idToken, data.expiresIn);

      this.router.navigate(["/framework"]);
    }, error => {
      this.error.status = true;
      this.error.message = ERROR_MESSAGES.register[error.error.error.message] || error.error.error.message;
    });
  }
}
