import WebSocket from 'ws';
import express from 'express';
import http from 'http';

import { WebSocketMessageDataInterface } from '../src/app/store/interfaces/websockets';
import { UserInterface } from '../src/app/store/interfaces/users';

const port = process.env.PORT || 8080;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

class Users {
  private data: UserInterface[];

  constructor() {
    this.data = [];
  }

  addOrUpdate(user: UserInterface): void {
    const userIndex = this.data.findIndex(data => data.id === user.id);

    this.data = userIndex > -1
      ? this.data.map(data => data.id !== user.id ? data : { ...user })
      : [...this.data, { ...user }]
    ;
  }

  getAllUsers(): UserInterface[] {
    return this.data;
  }
};

class Communication {
  static sendUserToAllClients(wss: WebSocket.Server, user: UserInterface): void {
    wss.clients.forEach(client => client.send(JSON.stringify({
      type: 'user',
      data: user,
    } as WebSocketMessageDataInterface)));
  };

  static sendAllUsersToClient(ws: WebSocket, users: UserInterface[]): void {
    ws.send(JSON.stringify({
      type: 'users',
      data: users,
    } as WebSocketMessageDataInterface));
  }
}

const users = new Users();

wss.on('connection', (ws: WebSocket) => {
  let myUser: UserInterface | null = null;

  ws.on('message', (data) => {
    const parseData: WebSocketMessageDataInterface | undefined = JSON.parse(data.toString());

    if (parseData) {
      switch (parseData.type) {
        case 'my-user': {
          myUser = { ...(parseData.data as UserInterface) };
          users.addOrUpdate(myUser);
          Communication.sendAllUsersToClient(ws, users.getAllUsers());
          Communication.sendUserToAllClients(wss, myUser);
          break;
        }
      }
    }
  });

  ws.on('close', () => {
    if (myUser) {
      myUser.active = false;
      users.addOrUpdate(myUser);
      Communication.sendUserToAllClients(wss, myUser);
    }
  });
});

server.listen(port, () => console.log(`> Listening on port: ${port}`));
