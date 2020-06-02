import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';

import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('amountInput') amountRef: ElementRef;
  @Output('addIngredient') add = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onAdd(nameInputRef) {
    const name = nameInputRef.value;
    const amount = 1 * this.amountRef.nativeElement.value;
    const ingredient = new Ingredient(name, amount);
    this.add.emit(ingredient);
  }

  onDelete() {
  }

  onClear() {
  }

}
