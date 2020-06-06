import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';

const appRoutes: Routes = [
  {
    path: 'recipes', component: RecipesComponent, children: [
      { path: '', component: RecipeStartComponent },
      { path: ':id/details', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },
    ]
  },
  { path: '', redirectTo: 'recipes', pathMatch: 'full'},
  {
    path: 'shopping-list', component: ShoppingListComponent, children: [
      { path: ':id/edit', component: ShoppingListEditComponent },
    ]
  },
  { path: 'not-found', component: ErrorPageComponent, data: {error: 'Page not found'}},
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
