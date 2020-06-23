import { Component, OnInit, OnDestroy } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

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
