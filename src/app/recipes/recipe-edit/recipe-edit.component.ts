import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { AppState } from '../../store/app.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  private recipeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
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
    this.recipeSub = this.route.params
      .pipe(
        map((params: Params) => params['id']),
        switchMap((id) => {
          this.id = id;
          this.editMode = this.id !== undefined;
          return this.store.select('recipe');
        }),
        map((recipeState) => recipeState.recipes)
      )
      .subscribe((recipes) => {
        if (this.editMode) {
          this.id = +this.id;
          const recipe = recipes[this.id];
          for (const ingredient of recipe.ingredients) {
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
            name: recipe.name,
            description: recipe.description,
            imagePath: recipe.imagePath,
          });
        }
      });
  }

  onSave() {
    const newRecipe: Recipe = this.recipeForm.value;
    if (this.editMode) {
      this.store.dispatch( new RecipeActions.UpdateRecipe({id: '' +this.id, recipe: newRecipe}))
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
    if (this.editMode) {
      this.router.navigate(['recipes']);
    } else {
      this.recipeForm.reset();
    }
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

  ngOnDestroy() {
    if(this.recipeSub) {
      this.recipeSub.unsubscribe();
    }
  }
}
