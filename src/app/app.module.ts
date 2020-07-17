import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { ShoppingListService } from './services/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AuthComponent } from './auth/auth.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceHolderDirective } from './shared/placeholder.directive';
import { RecipeService } from './services/recipes.service';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { ShoppingListRoutingModule } from './shopping-list/shopping-list-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    ErrorPageComponent,
    AuthComponent,
    LoaderComponent,
    AlertComponent,
    PlaceHolderDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // app modules
    RecipesModule,
    ShoppingListModule,
    ShoppingListRoutingModule,
    AppRoutingModule,
  ],
  // entryComponents: [
  //   AlertComponent
  // ],
  providers: [ShoppingListService, RecipeService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
