import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CreateFrameworkComponent } from 'src/app/components/create-framework/create-framework.component';
import { FrameworkService } from 'src/app/services/framework.service';
import { NewLinkComponent } from '../new-link/new-link.component';
// import { environments } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public authService: AuthService, public router: Router, public dialog: MatDialog, public frameworkService: FrameworkService) {}

  // environments = environments;
  ADMIN_EMAIL = process.env["NG_APP_ADMIN_EMAIL"];

  switchTheme(target: string) {
    if (target === "dark") {
      document.body.classList.add("dark");
      localStorage.setItem("theme_mode", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme_mode", "light");
    }
  }

  logoutUser() {
    this.authService.user = null;
    this.authService.isLoggedIn = false;
    localStorage.removeItem("user");

    this.router.navigate(["/login"]);
  }

  openDialog(type: string, frameworkId: string | null = null) {
    let dialogRef;
    switch (type) {
      case "create":
        dialogRef = this.dialog.open(CreateFrameworkComponent, { id: "createFrameworkDialog" });
        dialogRef.afterClosed().subscribe(() => {});
        break;
      case "newLink":
        dialogRef = this.dialog.open(NewLinkComponent, { id: "newLinkDialog", data: { frameworkId }});
        dialogRef.afterClosed().subscribe(() => {});
        break;
    }
  };
}
