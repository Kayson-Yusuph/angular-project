import { Component, OnInit } from '@angular/core';

import { DataStoreService } from '../services/data-store.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
  ) {}
ngOnInit() {
  this.authService.user.subscribe(user => {
    if (user) {
      this.isLogin = true;
    } else {
      this.router.navigate(['/auth']);
    }
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
    if (!this.isLogin) {
      this.authService.logout();
    } else {
      this.isLogin = false;
      this.router.navigate(['/auth']);
    }
  }

  logout() {
    this.authService.user.next(null);
  }
}
