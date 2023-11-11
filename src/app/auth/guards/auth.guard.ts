import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isLoggedIn)
    return true;

  inject(Router).navigate(["/login"]);
  return false;
};

export const authGuardChild: CanActivateChildFn = (route, state) => {
  if (inject(AuthService).isLoggedIn)
    return true;

  inject(Router).navigate(["/login"]);
  return false;
};
