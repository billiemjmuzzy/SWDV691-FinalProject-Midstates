import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }
  /**
   * Method to create a new user
   *
   * @param email string user email
   * @param password string user password
   */
  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    return this.http.post('http://localhost:3000/api/user/new-user', authData)
      .subscribe(() => {
        // TODO create user view for super admin to view users of application
        //TODO Navigation to user view
        this.router.navigate(['/']);
      }, error => {
          this.authStatusListener.next(false);
      });
  }
  /**
   * Method to login user
   * @param email string user email
   * @param password string user password
   */
  login(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this.http
      .post<{ token: string, expiresIn: number, userId: string }>(
        "http://localhost:3000/api/user/login", authData
      )
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate, this.userId);
          this.router.navigate(['/']);
        }
      }, error => {
          this.authStatusListener.next(false);
      });
  }

  /**
   * Method to sign user in based on data in local storage
   */
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();;
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }

  }

  /**
   * Method to log out
   */
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.userId = null;
    this.router.navigate(['/']);
  }

  /**
   * Method to set time for token
   * @param duration number when token expires
   */
  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  /**
   * Method to persist JWT token and date to local storage
   * @param token string JWT token
   * @param expirationDate Date when token expires
   * @param userId string id of user making changes
   */
  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId );
  }

  /**
   * Method to clear local storage
   */
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  /**
   * Method to check if token and expiration date are
   * persisted in local storage
   */
  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
}