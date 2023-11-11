import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { Page1Component } from './components/page1/page1.component';
import { Page2Component } from './components/page2/page2.component';
import { Page3Component } from './components/page3/page3.component';
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
      //   redirectTo: "page1"
      // },
      {
        path: "page1",
        component: Page1Component
      },
      {
        path: "page2",
        component: Page2Component
      },
      {
        path: "page3",
        component: Page3Component
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
