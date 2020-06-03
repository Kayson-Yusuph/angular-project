import { Recipe } from '../recipes/recipe.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('A Test recipe', 'This is a simple recipe test', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/caponata-pasta_1.jpg'),
    new Recipe('A New recipe', 'This is a next recipe test', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/caponata-pasta_1.jpg')
  ];

  getRecipes() {
    return this.recipes.slice();
  }

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
