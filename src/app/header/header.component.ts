import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { DataStoreService } from '../services/data-store.service';
import { AuthService } from '../auth/auth.service';
import { AppState } from '../store/app.reducers';
import * as authActions from '../auth/store/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  isLogin = false;

  constructor(
    private dataStoreService: DataStoreService,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }
  ngOnInit() {
    this.store.select('auth').pipe(map((userData) => userData.user)).subscribe(user => {
      this.isLogin = !!user;
    });
  }

  onSave() {
    this.dataStoreService.storeRecipes();
  }

  onFetch() {
    this.dataStoreService.fetchRecipes()
      .subscribe((res) => {
      }, (error) => {
        console.error(error);
      });
  }

  onLoginLogout() {
    if (this.isLogin) {
      this.store.dispatch( new authActions.Logout());
      this.isLogin = false;
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
