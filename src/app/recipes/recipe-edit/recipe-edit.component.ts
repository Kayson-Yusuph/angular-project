import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

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
            name: this.fb.control(ingredient.name),
            amount: this.fb.control(ingredient.amount)
          }),
        );
      }
    }
    this.recipeForm = this.fb.group({
      name: this.fb.control(name),
      imagePath: this.fb.control(imagePath),
      description: this.fb.control(description),
      ingredients
    });
  }

  onSave() {
    const newRecipe: Recipe = this.recipeForm.value;
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      this.fb.group({
        name: this.fb.control(null),
        amount: this.fb.control(null)
      })
    );
  }

  onRemoveIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

}
