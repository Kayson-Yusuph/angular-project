import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';

import { Recipe } from '../../recipe.model';
import { AppState } from '../../../store/app.reducers';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  recipe: Recipe;
  @Input('index') id: number;

  constructor( private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('recipe').subscribe(resData => {
      this.recipe = resData.recipes[this.id];
    })
  }

}
