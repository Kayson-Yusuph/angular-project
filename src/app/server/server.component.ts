import { Component } from '@angular/core';


@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styles: [`
  .online{
    color: white;
  }
  `]
})
export class ServerComponent {
  serverId = 10;
  serverStatus = 'Online';

  constructor() {
    this.serverStatus = Math.random() < 0.5 ? 'Offline' : 'Online';
  }

  getServerStatus() {
    return this.serverStatus;
  }

  getColor() {
    const color = this.serverStatus === 'Offline' ? 'red' : 'green';
    return color;
  }
}
