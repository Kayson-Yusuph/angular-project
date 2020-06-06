import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreatedStatus = 'No server was created';
  serverName = 'Test server';
  userName = '';
  showUsername = false;

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit(): void {
  }

  onServerCreation() {
    this.serverCreatedStatus = 'New server was created! Name is ' + this.serverName;
  }

  onUpdateServerName(event) {
    this.serverName = event.target.value;
  }

  onUsernameInput(event) {
    this.showUsername = false;
  }

}
