import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "./../../environments/environment";
import { User } from "th-ng-commons";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  
  public get url() : string {
    return environment.host.backend.th_lumen_configuration;
  }

  me() {
    return this.http.post(this.url + 'me', {});
  }

  isAdmin() {
    const userInfo = this.getUserInfo();
    return userInfo['idrol'] == 1;
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem('th_user_info'));
  }

  login(user: User) {
    return this.http.post(this.url + 'login', user);
  }

  signin(user: User) {
    return this.http.post(this.url + 'signin', user);
  }
}
