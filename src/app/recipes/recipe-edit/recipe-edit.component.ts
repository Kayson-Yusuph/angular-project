import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { RecipeService } from '../../services/recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.editMode = params.id !== undefined;
      this.initForm();
    });
  }

  private initForm() {
    let name = '';
    let imagePath = '';
    let description = '';
    const ingredients = this.fb.array([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      for (const ingredient of recipe.ingredients) {
        ingredients.push(
          this.fb.group({
            name: this.fb.control(ingredient.name, this.getFormInputValidators(4)),
            amount: this.fb.control(ingredient.amount, [Validators.required, Validators.pattern('^[1-9][0-9]*$')])
          }),
        );
      }
    }
    this.recipeForm = this.fb.group({
      name: this.fb.control(name, this.getFormInputValidators(3)),
      imagePath: this.fb.control(imagePath, Validators.required),
      description: this.fb.control(description, this.getFormInputValidators(10)),
      ingredients
    });
  }

  onSave() {
    const newRecipe: Recipe = this.recipeForm.value;
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      const index = this.recipeService.addRecipe(newRecipe);
    }
    this.router.navigate(['recipes']);
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      this.fb.group({
        name: this.fb.control(null, this.getFormInputValidators(4)),
        amount: this.fb.control(null, [Validators.required, Validators.pattern('^[1-9][0-9]*$')])
      })
    );
  }

  onClear() {
    this.recipeForm.reset();
  }

  getFormInputValidators(min: number): any[] {
    return [Validators.required, Validators.minLength(min), Validators.pattern(/^[\w\s]+$/)];
  }

  onRemoveIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

}
