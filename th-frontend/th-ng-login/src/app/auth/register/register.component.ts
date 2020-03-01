import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User, ERole, TokenService } from 'th-ng-commons';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isTextType: boolean;
  registerForm: FormGroup;

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) {
    this.isTextType = false;
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password_confirmation: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
  }


  public get passwordsMatch(): boolean {
    return this.registerForm.get('password').value == this.registerForm.get('password_confirmation').value;
  }


  onSubmit() {
    const formData = this.registerForm.value;
    const user = this.createUserData(formData);
    this.authService.signin(user).subscribe(data => {
      this.handleResponse(data);
    }, error => console.error(error)
    );
  }

  handleResponse(data) {
    this.tokenService.handle(data);
    // DJ - TODO redirect to frontend by role
    window.location.href = environment.host.frontend.th_ng_configuration;
  }

  createUserData(data: any) {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    user.role = ERole.STUDENT.value;
    user.password_confirmation = data.password_confirmation;
    return user;
  }

}
