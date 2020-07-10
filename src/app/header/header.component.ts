import { Component } from '@angular/core';

import { DataStoreService } from '../services/data-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {
  isLogin = false;

  constructor( private dataStoreService: DataStoreService ) {}

  onSave() {
    this.dataStoreService.storeRecipes();
  }

  onFetch() {
    this.dataStoreService.fetchRecipes()
      .subscribe((res) => {
    }, (error) => {
      console.error(error);
    });
  }

  onLogout() {
    this.isLogin = !this.isLogin;;
    console.log('Logging out!');
  }
}
