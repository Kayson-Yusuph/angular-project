import { Component } from '@angular/core';

import { DataStoreService } from '../services/data-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {

  constructor( private dataStoreService: DataStoreService ) {}

  onSave() {
    this.dataStoreService.storeRecipes();
  }

  onFetch() {
    this.dataStoreService.fetchRecipes();
  }
}
