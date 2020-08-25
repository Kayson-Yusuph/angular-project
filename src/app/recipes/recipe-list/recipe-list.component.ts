import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

import { Recipe } from '../recipe.model';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes$: Observable<{recipes: Recipe[]}>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.recipes$ = this.store.select('recipe');
  }

}
