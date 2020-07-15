import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './shopping-list/shopping-list-edit/shopping-list-edit.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full'},
  {
    path: 'shopping-list', component: ShoppingListComponent, children: [
      { path: ':id/edit', component: ShoppingListEditComponent },
    ]
  },
  { path: 'not-found', component: ErrorPageComponent, data: { error: 'Page not found' } },
  { path: 'auth', component: AuthComponent },
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
