import { Component, OnInit } from '@angular/core';

import { Reciepe } from '../reciepe.model';

@Component({
  selector: 'app-reciepe-list',
  templateUrl: './reciepe-list.component.html',
  styleUrls: ['./reciepe-list.component.css']
})
export class ReciepeListComponent implements OnInit {

  reciepes: Reciepe[] = [
    new Reciepe('A Test Reciepe', 'This is a simple reciepe test', './home/joasjaphes/Pictures/key_to_success.png')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
