import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FrameworkPageComponent } from './components/framework-page/framework-page.component';
import { authGuardChild } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    // canActivate: [authGuard],
    canActivateChild: [authGuardChild],
    component: DashboardComponent,
    children: [
      // {
      //   path: "",
      //   pathMatch: "full",
      //   redirectTo: "framework"
      // },
      {
        path: "framework/:name",
        component: FrameworkPageComponent
      }
    ]
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "404",
    component: DashboardComponent
    // TODO set the component
  },
  {
    path: "**",
    redirectTo: "/404"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
