import { Injectable } from '@angular/core';
import { TokenService } from 'th-ng-commons';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private tokenService: TokenService) { }

  logout() {
    this.tokenService.remove();
    window.location.href = environment.host.frontend.th_ng_login;
  }
}
