import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  createdServer = false;
  serverName = 'Test server';
  servers = ['Test Server 2', 'Test Server'];

  constructor() {
    // setTimeout(() => {
    //   this.allowNewServer = true;
    // }, 2000);
  }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.createdServer = true;
    this.servers.push(this.serverName);
  }

}
