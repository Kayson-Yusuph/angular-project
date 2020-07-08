import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error = '';

  @ViewChild('f') signUpForm: NgForm;

  constructor(private authService: AuthService) { }

  onSubmit() {
    if (!this.signUpForm.valid) {
      return;
    }
    this.isLoading = true;
    if (this.isLoginMode) {
      // ...
    } else {
      const { email, password } = this.signUpForm.value;
      this.authService.signUp(email, password)
        .subscribe(res => {
          console.log(res);
          this.isLoading = false;
          this.onClear();
        }, (errorMessage) => {
          this.isLoading = false;
          this.error = errorMessage;
        });
    }
  }

  onClear() {
    this.signUpForm.reset();
  }

  onSwitch() {
    this.onClear();
    this.isLoginMode = !this.isLoginMode;
  }
}
