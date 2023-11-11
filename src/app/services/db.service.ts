import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DB_API_KEY } from 'env';
// CREATE A FILE NAMED env.ts IN THE PROJECT ROOT DIRECTORY AND FILL IT LIKE THIS:
// export const DB_API_KEY = "providedApiKeyString";

export const ERROR_MESSAGES: any = {
  register: {
    "INVALID_EMAIL": "Email format not valid",
    "WEAK_PASSWORD : Password should be at least 6 characters": "Password must be at least 6 characters long",
    "EMAIL_EXISTS": "E-mail already registered"
  },
  login: {
    "INVALID_LOGIN_CREDENTIALS": "Incorrect credentials",
    "INVALID_EMAIL": "Email format not valid",
    "API key not valid. Please pass a valid API key.": "Server error: please contact the administrator"
  }
};

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private http: HttpClient) { }

  API_KEY = DB_API_KEY;
  REGISTER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
  LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;

  registerUser(email: string, password: string) {
    const body = {
      email,
      password,
      returnSecureToken: true
    }

    return this.http.post(this.REGISTER_URL, body);
  }

  loginUser(email: string, password: string) {
    const body = {
      email,
      password,
      returnSecureToken: true
    }

    return this.http.post(this.LOGIN_URL, body);
  }
}
