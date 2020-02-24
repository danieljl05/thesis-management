import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handle(data) {
    this.saveInfo(data['user']);
    this.set(data['access_token']);
  }

  set(token) {
    localStorage.setItem('th_token', token);
    this.payload(token);
  }

  saveInfo(info) {
    info = JSON.stringify(info);
    localStorage.setItem('th_user_info', info);
  }

  get() {
    return localStorage.getItem('th_token');
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
    localStorage.setItem('th_payload', JSON.stringify(decoded));
    return decoded;
  }

  getPayload() {
    return JSON.parse(localStorage.getItem('th_payload'));
  }

  remove() {
    localStorage.removeItem('th_token');
    localStorage.removeItem('th_payload');
    localStorage.removeItem('th_user_info');
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }
}
