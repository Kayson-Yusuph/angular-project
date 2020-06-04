import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('amountInput') amountRef: ElementRef;

  constructor(private shoppingLIstService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAdd(nameInputRef) {
    const name = nameInputRef.value;
    const amount = 1 * this.amountRef.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.shoppingLIstService.addIngredients([ingredient]);
  }

  onDelete() {
  }

  onClear() {
  }

}
