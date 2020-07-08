import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthModel } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error = '';
  loadingText = 'Logging in...';

  constructor(private authService: AuthService) { }

  onSubmit(form: NgForm) {
    this.error = '';
    if (!form.valid) {
      return;
    }
    const { email, password } = form.value;
    let authObs: Observable<AuthModel>;
    this.isLoading = true;
    if (this.isLoginMode) {
      this.loadingText = 'Logging in...';
      authObs = this.authService.login(email, password);
    } else {
      this.loadingText = 'Signing up...';
      authObs = this.authService.signUp(email, password);
    }
    authObs.subscribe((res) => {
      console.log(res);
      this.isLoading = false;
      form.reset();
    }, errorMessage => {
      this.isLoading = false;
      this.error = errorMessage;
    });
  }

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }
}
