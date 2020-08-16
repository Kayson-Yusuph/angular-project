import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import { AppState } from './store/app.reducers';
import { AuthService } from './auth/auth.service';
import { AutoLogin } from './auth/store/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch( new AutoLogin());
  }
}
