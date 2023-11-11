import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: User | null;

  isLoggedIn!: boolean; // TODO set to false by default

  setUserAsLogged(email: string, localId: string, idToken: string, expiresIn: string) {
    const expirationDate = new Date().getTime() + (parseInt(expiresIn) * 1000);

    this.user = new User(email, localId, idToken, expirationDate);

    this.isLoggedIn = true;

    localStorage.setItem("user", JSON.stringify(this.user));
  }
}
