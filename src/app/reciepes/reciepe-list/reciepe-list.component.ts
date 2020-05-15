import { Component, OnInit } from '@angular/core';

import { Reciepe } from '../reciepe.model';

@Component({
  selector: 'app-reciepe-list',
  templateUrl: './reciepe-list.component.html',
  styleUrls: ['./reciepe-list.component.css']
})
export class ReciepeListComponent implements OnInit {

  reciepes: Reciepe[] = [
    new Reciepe('A Test Reciepe', 'This is a simple reciepe test', 'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/caponata-pasta_1.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
