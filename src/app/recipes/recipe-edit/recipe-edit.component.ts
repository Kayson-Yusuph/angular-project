import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';

import { RecipeService } from '../../services/recipes.service';
import { Recipe } from '../recipe.model';
import { AppState } from '../../store/app.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipe: Recipe;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private store: Store<AppState>
  ) {}

  get ingredientControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  ngOnInit(): void {
    const ingredients = this.fb.array([]);
    this.recipeForm = this.fb.group({
      name: this.fb.control('', this.getFormInputValidators(3)),
      imagePath: this.fb.control('', Validators.required),
      description: this.fb.control('', this.getFormInputValidators(10)),
      ingredients,
    });
    this.route.params.pipe(
      map((params: Params) => +params['id']),
      switchMap((id) => {
        this.id = id;
        this.editMode = this.id !== undefined;
        return this.store.select('recipe');
      }),
      map((recipeState) => recipeState.recipes)
    ).subscribe((recipes) => {
      if (this.editMode) {
        this.recipe = recipes[this.id];
        for (const ingredient of this.recipe.ingredients) {
          ingredients.push(
            this.fb.group({
              name: this.fb.control(
                ingredient.name,
                this.getFormInputValidators(4)
              ),
              amount: this.fb.control(ingredient.amount, [
                Validators.required,
                Validators.pattern('^[1-9][0-9]*$'),
              ]),
            })
          );
        }
        this.recipeForm.patchValue({
          name: this.recipe.name,
          description: this.recipe.description,
          imagePath: this.recipe.imagePath,
          ingredients,
        });
      }
    });
  }

  onSave() {
    const newRecipe: Recipe = this.recipeForm.value;
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe({ recipe: newRecipe }));
    }
    this.router.navigate(['recipes']);
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      this.fb.group({
        name: this.fb.control(null, this.getFormInputValidators(4)),
        amount: this.fb.control(null, [
          Validators.required,
          Validators.pattern('^[1-9][0-9]*$'),
        ]),
      })
    );
  }

  onClear() {
    this.recipeForm.reset();
  }

  getFormInputValidators(min: number): any[] {
    return [
      Validators.required,
      Validators.minLength(min),
      Validators.pattern(/^[\w\s]+$/),
    ];
  }

  onRemoveIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
}
