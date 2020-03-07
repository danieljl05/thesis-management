import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "./../../environments/environment";
import { User } from "th-ng-commons";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public get url(): string {
    return environment.host.backend.th_lm_login;
  }

  login(user: User) {
    return this.http.post(this.url + 'login', user);
  }

  signin(user: User) {
    return this.http.post(this.url + 'signin', user);
  }

  me() {
    return this.http.post(this.url + 'me', {});
  }
}
