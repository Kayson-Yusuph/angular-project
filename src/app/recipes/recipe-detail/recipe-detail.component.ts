import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppState } from '../../store/app.reducers';
import * as RecipeActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params: Params) => +params['id']),
        switchMap((id) => {
          this.id = id;
          return this.store.select('recipe');
        }),
        map((recipeState) => recipeState.recipes)
      )
      .subscribe((recipes) => (this.recipe = recipes[this.id]));
  }

  addToShoppingList() {
    this.store.dispatch( new ShoppingListActions.AddIngredients({ingredients: this.recipe.ingredients}))
    this.router.navigate(['/shopping-list'], { relativeTo: this.route });
  }

  editRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  deleteRecipe() {
    this.store.dispatch( new RecipeActions.DeleteRecipe({id: '' +this.id}))
    // this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'], { relativeTo: this.route });
  }
}
