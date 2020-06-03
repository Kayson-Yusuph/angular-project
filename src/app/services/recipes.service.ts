import { Recipe } from '../recipes/recipe.model';

export class RecipeService {
  recipes: Recipe[] = [];

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }
  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
  }
  updateRecipe(id: number) {
    console.log('Update recipe ' + this.recipes[id].name);
  }
}
