import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DB_API_KEY } from 'env';
import { AuthService } from '../auth/services/auth.service';
// CREATE A FILE NAMED env.ts IN THE PROJECT ROOT DIRECTORY AND FILL IT LIKE THIS:
// export const DB_API_KEY = "providedApiKeyString";

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  API_KEY = DB_API_KEY;
  REGISTER_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;
  LOGIN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`;

  DB_BASE_URL = "https://angular-dashboard-13046-default-rtdb.europe-west1.firebasedatabase.app";

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

  getFrameworks() {
    return this.http.get(`${this.DB_BASE_URL}/framework.json?auth=${this.authService.user!.getToken()}`);
  }

  saveFramework(name: string, logo: string, website: string) {
    const body = {
      name,
      logo,
      website,
      createdBy: this.authService.user!.email,
      lastUpdatedBy: this.authService.user!.email,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return this.http.post(`${this.DB_BASE_URL}/framework.json?auth=${this.authService.user!.getToken()}`, body);
  }

  editFramework(id: string, name: string, logo: string, website: string) {
    const body = {
      name,
      logo,
      website,
      lastUpdatedBy: this.authService.user!.email,
      updatedAt: new Date()
    }

    return this.http.patch(`${this.DB_BASE_URL}/framework/${id}.json?auth=${this.authService.user!.getToken()}`, body);
  }

  deleteFramework(id: string) {
    return this.http.delete(`${this.DB_BASE_URL}/framework/${id}.json?auth=${this.authService.user!.getToken()}`);
  }

  getAllLinks() {
    return this.http.get(`${this.DB_BASE_URL}/link.json?auth=${this.authService.user!.getToken()}`);
  }

  createLink(frameworkId: string, name: string, link: string) {
    const body = {
      framework_id: frameworkId,
      name,
      link,
      createdBy: this.authService.user!.email,
      lastUpdatedBy: this.authService.user!.email,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    return this.http.post(`${this.DB_BASE_URL}/link.json?auth=${this.authService.user!.getToken()}`, body);
  }

  getFrameworkLinks(frameworkId: string) {
    return this.http.get(`${this.DB_BASE_URL}/link.json?orderBy="framework_id"&equalTo="${frameworkId}"&auth=${this.authService.user!.getToken()}`);
  }
}
