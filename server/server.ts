import WebSocket from 'ws';
import express from 'express';
import http from 'http';

import { WebSocketMessageDataInterface } from '../src/app/store/interfaces/websockets';
import { MessageInterface } from '../src/app/store/interfaces/messages';
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

class Messages {
  private data: MessageInterface[];

  constructor() {
    this.data = [];
  }

  addOrUpdate(message: MessageInterface): void {
    const messageIndex = this.data.findIndex(data => data.id === message.id);

    this.data = messageIndex > -1
      ? this.data.map(data => data.id !== message.id ? data : { ...message })
      : [...this.data, { ...message }]
    ;
  }

  getAllMessages(): MessageInterface[] {
    return this.data;
  }
}

class Communication {
  static sendMessageToAllClients(wss: WebSocket.Server, message: MessageInterface): void {
    wss.clients.forEach(client => client.send(JSON.stringify({
      type: 'message',
      data: message,
    } as WebSocketMessageDataInterface)));
  };

  static sendAllMessagesToClient(ws: WebSocket, messages: MessageInterface[]): void {
    ws.send(JSON.stringify({
      type: 'messages',
      data: messages,
    } as WebSocketMessageDataInterface));
  }

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
const messages = new Messages();

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
          Communication.sendAllMessagesToClient(ws, messages.getAllMessages());
          Communication.sendUserToAllClients(wss, myUser);
          break;
        }
        case 'message': {
          const message = { ...(parseData.data as MessageInterface) };
          messages.addOrUpdate(message);
          Communication.sendMessageToAllClients(wss, message);
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
