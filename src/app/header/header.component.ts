import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {

  constructor(private route: ActivatedRoute, private router: Router) { }

  onSelected(value: boolean) {
    if (value) {
      this.router.navigate(['/recipes']);
    } else {
      this.router.navigate(['/shopping-list']);
    }
  }

}
