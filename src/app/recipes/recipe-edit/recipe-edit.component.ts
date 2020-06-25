import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe((params: Params) => {
      if (params.id !== undefined) {
        this.id = +params.id;
        this.editMode = true;
        this.initForm();
      }
    });
  }

  private initForm() {
    let name = '';
    let imagePath = '';
    let description = '';
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(name),
      imagePath: new FormControl(imagePath),
      description: new FormControl(description)
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

}
