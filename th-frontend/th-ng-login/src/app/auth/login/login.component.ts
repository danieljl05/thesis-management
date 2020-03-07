import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User, TokenService } from 'th-ng-commons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  isTextType: boolean;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private tokenService: TokenService) {
    this.isTextType = false;
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    const user = new User();
    user.email = this.loginForm.value.email;
    user.password = this.loginForm.value.password;

    this.authService.login(user).subscribe(data => {
      this.handleResponse(data);
    }, error => console.error(error));
  }

  handleResponse(data) {
    this.tokenService.handle(data);
    this.goToStartUrl();
  }

  goToStartUrl() {
    setTimeout(() => {
      window.location.href = this.tokenService.getStartUrl();
    }, 200);
  }

  toogleTextType() {
    this.isTextType = !this.isTextType;
  }
}
