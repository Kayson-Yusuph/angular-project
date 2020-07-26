import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { AddIngredient, UpdateIngredient, DeleteIngredient } from '../store/shopping-list.actions';

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
  igIndex = -1;
  constructor(
    private sLService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
    ) { }

  ngOnInit(): void {
    this.igSubscription = this.sLService.ingredientToEdit.subscribe((i) => {
      this.igIndex = i;
      if(i > -1) {
        this.isAdd = false;
      }
      this.ingredient = this.sLService.getIngredient(i);
      this.slForm.setValue({
        name: this.ingredient.name,
        amount: this.ingredient.amount
      });
    });
  }

  onSave(form: NgForm) {
    const name = form.value.name;
    const amount = +form.value.amount;
    const ingredient = new Ingredient(name, amount);
    if (this.isAdd) {
      this.store.dispatch( new AddIngredient({ingredient}));
      // this.sLService.addIngredient(ingredient);
    } else {
      this.store.dispatch(new UpdateIngredient({ index: this.igIndex, ingredient }));
      // this.sLService.updateIngredient(this.igIndex, ingredient);
    }
    this.onClear();
  }

  onDelete() {
    // this.sLService.deleteIngredient(this.igIndex);
    this.store.dispatch(new DeleteIngredient({ index: this.igIndex }));
    this.onClear();
  }

  onClear() {
    this.igIndex = -1;
    this.isAdd = true;
    this.ingredient = null;
    this.slForm.reset();
  }

  ngOnDestroy() {
    this.igSubscription.unsubscribe();
  }

}
