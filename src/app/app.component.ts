import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
  .great {
    color: white;
  }
  `]
})
export class AppComponent {
  showDetails = false;
  clicks = [];
  count = 0;

  onButtonClick() {
    this.count++;
    this.showDetails = !this.showDetails;
    this.clicks.push(this.count);
  }
}
