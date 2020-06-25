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
    this.route.params.subscribe((params: Params) => {
      console.log('Called!', params);
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
      console.log('In form init!');
      const recipe = this.recipeService.getRecipe(this.id);
      console.log({recipe});
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

}
