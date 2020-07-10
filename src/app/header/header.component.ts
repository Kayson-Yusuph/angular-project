import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DataStoreService } from '../services/data-store.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent implements OnInit {
  isLogin = false;

  constructor(
    private dataStoreService: DataStoreService,
    private authService: AuthService,
    private router: Router
  ) { }
  ngOnInit() {
    this.authService.user.subscribe(user => {
      this.isLogin = !!user;
    });
  }

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

  onLoginLogout() {
    if (this.isLogin) {
      this.authService.logout();
      this.isLogin = false;
    } else {
      this.router.navigate(['/auth']);
    }
  }
}
