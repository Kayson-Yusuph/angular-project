import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})


export class HeaderComponent {

  @Output('selectMenu') selectedMenu = new EventEmitter<boolean>();

  onSelected(value: boolean) {
    this.selectedMenu.emit(value);
  }

}
