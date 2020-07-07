import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLogin = true;

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    if(this.isLogin) {
      // ...
    } else {
      this.authService.signUp(form.value.email, form.value.password)
          .subscribe(res=> {
            console.log(res);
          },(error) => {
            console.error(error);
          });
    }
  }

  onSwitch() {
    this.isLogin = !this.isLogin;
  }
}
