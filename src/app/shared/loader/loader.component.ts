import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  styleUrls: ['loader.component.css'],
  templateUrl: './loader.component.html'
})
export class LoaderComponent {

  @Input() loadingText = 'Please wait...';
}
