import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../../services/recipes.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.store.select('recipe').subscribe(resData => {
        this.recipe = resData.recipes[this.id];
      })
    });
  }

  addToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    this.router.navigate(['/shopping-list'], {relativeTo: this.route});
  }

  editRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }
}
