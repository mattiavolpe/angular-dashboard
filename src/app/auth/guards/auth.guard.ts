import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuardChild: CanActivateChildFn = () => {
  if (inject(AuthService).isLoggedIn)
    return true;

  inject(Router).navigate(["/login"]);
  return false;
};
