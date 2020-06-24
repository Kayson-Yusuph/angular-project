import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: false}) slForm: NgForm;

  igSubscription: Subscription;
  ingredient: Ingredient = new Ingredient('', null);
  isAdd = true;
  igIndex = -1;
  constructor(private sLService: ShoppingListService) { }

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
      this.sLService.addIngredient(ingredient);
    } else {
      this.sLService.updateIngredient(this.igIndex, ingredient);
    }
  }

  onDelete() {
  }

  onClear() {
  }

  ngOnDestroy() {
    this.igSubscription.unsubscribe();
  }

}
