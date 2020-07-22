import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { LoggingService } from '../services/logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  private igSubscriptions: Subscription[] = [];

  constructor(private sLService: ShoppingListService, private loggingService: LoggingService) {}

  ngOnInit() {
    this.ingredients = this.sLService.getIngredients();
    this.igSubscriptions.push(this.sLService.ingredientsChanged
    .subscribe((newIngredients: Ingredient[]) => {
      this.ingredients = newIngredients;
    }));
    this.loggingService.printLog('Hello from shopping list module');
  }

  edit(index: number) {
    this.sLService.ingredientToEdit.next(index);
  }

  ngOnDestroy() {
    this.igSubscriptions.forEach(igSub => igSub.unsubscribe());
  }

}
