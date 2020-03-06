import { Injectable } from '@angular/core';
import { ERole } from '../enums/ERole';
import { environment } from './../environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  static TOKEN_KEY: string = 'th_token';
  static PAYLOAD_KEY: string = 'th_payload';
  static USER_INFO_KEY: string = 'th_user_info';

  constructor() { }

  handle(data) {
    this.saveInfo(data['user']);
    this.set(data['access_token']);
  }

  set(token) {
    localStorage.setItem(TokenService.TOKEN_KEY, token);
    this.payload(token);
  }

  saveInfo(info) {
    info = JSON.stringify(info);
    localStorage.setItem(TokenService.USER_INFO_KEY, info);
  }

  get() {
    return localStorage.getItem(TokenService.TOKEN_KEY);
  }

  static getToken() {
    return localStorage.getItem(TokenService.TOKEN_KEY);
  }

  isValid() {
    let valid = false;
    if (this.get()) {
      const payload = this.getPayload();
      if (payload) {
        valid = (Date.now() < (payload['exp'] * 1000));
      }
    }
    return valid;
  }

  payload(token) {
    const payload = token.split('.')[1];
    const decoded = this.decode(payload);
    localStorage.setItem(TokenService.PAYLOAD_KEY, JSON.stringify(decoded));
    return decoded;
  }

  getPayload() {
    return JSON.parse(localStorage.getItem(TokenService.PAYLOAD_KEY));
  }

  remove() {
    localStorage.removeItem(TokenService.TOKEN_KEY);
    localStorage.removeItem(TokenService.PAYLOAD_KEY);
    localStorage.removeItem(TokenService.USER_INFO_KEY);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  getRole() {
    const userInfo = this.getUserInfo();
    return userInfo['role'];
  }

  isAdmin() {
    return this.getRole() == ERole.ADMIN.key;
  }

  isEvaluator() {
    return this.getRole() == ERole.EVALUATOR.key;
  }

  isStudent() {
    return this.getRole() == ERole.STUDENT.key;
  }

  getUserInfo() {
    return JSON.parse(localStorage.getItem(TokenService.USER_INFO_KEY));
  }

  getStartUrl() {
    const role = this.getRole();
    let url = environment.host.frontend.th_ng_projects_bank;
    if (role == ERole.ADMIN.key) {
      url = environment.host.frontend.th_ng_configuration;
    } else if (role == ERole.EVALUATOR.key) {
      url = environment.host.frontend.th_ng_evaluation;
    }
    return url;
  }
}
