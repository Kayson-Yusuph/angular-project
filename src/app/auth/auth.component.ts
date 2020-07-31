import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService, AuthModel } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder.directive';
import { AppState } from '../store/app.reducers';
import * as authActions from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error = '';
  loadingText = 'Logging in...';
  alertSub: Subscription;
  @ViewChild(PlaceHolderDirective) alertHost: PlaceHolderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.select('auth').subscribe((userState) => {
      console.log(userState);
      this.isLoading = userState.loading;
      this.error = userState.authError;
      this.showErrorAlert(this.error);
    });
  }

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
      // authObs = this.authService.login(email, password);
      this.store.dispatch(
        new authActions.LoginStart({ email: email, password: password })
      );
    } else {
      this.loadingText = 'Signing up...';
      authObs = this.authService.signUp(email, password);
    }
    // authObs.subscribe(
    //   (res) => {
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //     form.reset();
    //   },
    //   (errorMessage) => {
    //     this.isLoading = false;
    //     this.error = errorMessage;
    //     this.showErrorAlert(errorMessage);
    //   }
    // );
        form.reset();
  }

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  onClose() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const component = hostViewContainerRef.createComponent(alertCmpFactory);
    component.instance.message = message;
    this.alertSub = component.instance.closeAlert.subscribe(() => {
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.alertSub) {
      this.alertSub.unsubscribe();
    }
  }
}
