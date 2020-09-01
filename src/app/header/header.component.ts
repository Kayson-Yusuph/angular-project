import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AppState } from '../store/app.reducers';
import * as authActions from '../auth/store/auth.action';
import * as recipeActions from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  isLogin = false;

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }
  ngOnInit() {
    this.store.select('auth').pipe(map((userData) => userData.user)).subscribe(user => {
      this.isLogin = !!user;
    });
  }

  onSave() {
    this.store.dispatch(new recipeActions.StoreRecipes());
  }

  onFetch() {
    this.store.dispatch(new recipeActions.FetchRecipes());
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
