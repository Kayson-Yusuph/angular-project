import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  OnDestroy,
  OnInit,
} from '@angular/core';
  import { Store } from '@ngrx/store';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from './auth.service';
import { AppState } from '../store/app.reducers';
import { AuthModel } from './store/auth.effects';
import * as authActions from './store/auth.action';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder.directive';

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
      this.isLoading = userState.loading;
      this.error = userState.authError;
      if(this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  onSubmit(form: NgForm) {
    this.error = '';
    if (!form.valid) {
      return;
    }
    const credentials = form.value;
    let authObs: Observable<AuthModel>;
    this.isLoading = true;
    if (this.isLoginMode) {
      this.loadingText = 'Logging in...';
      this.store.dispatch(
        new authActions.LoginStart(credentials)
      );
    } else {
      this.loadingText = 'Signing up...';
      this.store.dispatch(new authActions.SignUpStart(credentials))
    }
    form.reset();
  }

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  private clearError() {
    this.store.dispatch(new authActions.ClearError());
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );
    // if(this.alertHost) {
      const hostViewContainerRef = this.alertHost.viewContainerRef;
      hostViewContainerRef.clear();

      const component = hostViewContainerRef.createComponent(alertCmpFactory);
      component.instance.message = message;
      this.alertSub = component.instance.closeAlert.subscribe(() => {
        hostViewContainerRef.clear();
      });
    // }
  }

  ngOnDestroy() {
    if (this.alertSub) {
      this.alertSub.unsubscribe();
    }
  }
}
