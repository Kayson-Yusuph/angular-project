import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListAction from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;

  igSubscription: Subscription;
  ingredient: Ingredient;
  isAdd = true;

  constructor(
    private store: Store<fromShoppingList.AppState>
    ) { }

  ngOnInit(): void {
    this.igSubscription = this.store.select('shoppingList').subscribe(igData => {
      if(igData && igData.editedIngredientIndex > -1) {
        this.isAdd = false
        this.ingredient = igData.editedIngredient;
        this.slForm.setValue({
          name: this.ingredient.name,
          amount: this.ingredient.amount
        });
      } else {
        this.isAdd = true;
      }
    })
  }

  onSave(form: NgForm) {
    const name = form.value.name;
    const amount = +form.value.amount;
    const ingredient = new Ingredient(name, amount);
    if (this.isAdd) {
      this.store.dispatch(new ShoppingListAction.AddIngredient({ingredient}));
    } else {
      this.store.dispatch(new ShoppingListAction.UpdateIngredient({ ingredient }));
    }
    this.onClear();
  }

  onDelete() {
    this.store.dispatch(new ShoppingListAction.DeleteIngredient());
    this.onClear();
  }

  onClear() {
    this.isAdd = true;
    this.ingredient = null;
    this.slForm.reset();
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }

  ngOnDestroy() {
    this.igSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListAction.StopEdit());
  }

}
