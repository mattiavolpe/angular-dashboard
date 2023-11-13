import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CreateFrameworkComponent } from 'src/app/components/create-framework/create-framework.component';
import { FrameworkService } from 'src/app/services/framework.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public authService: AuthService, public router: Router, public dialog: MatDialog, public frameworkService: FrameworkService) {}

  logoutUser() {
    this.authService.user = null;
    this.authService.isLoggedIn = false;
    localStorage.removeItem("user");

    this.router.navigate(["/login"]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateFrameworkComponent, { id: "createFrameworkDialog" });
    dialogRef.afterClosed().subscribe(() => {
    });
  };
}
