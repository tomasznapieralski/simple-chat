import WebSocket from 'ws';

import { WebSocketMessageDataInterface } from '../../src/app/store/interfaces/websockets';
import { MessageInterface } from '../../src/app/store/interfaces/messages';
import { UserInterface } from '../../src/app/store/interfaces/users';

import { btoa } from '../utils/base64';

export class Communication {
  static sendMessageToAllClients(wss: WebSocket.Server, message: MessageInterface): void {
    wss.clients.forEach(client => client.send(btoa(JSON.stringify({
      type: 'message',
      data: message,
    } as WebSocketMessageDataInterface))));
  };

  static sendAllMessagesToClient(ws: WebSocket, messages: MessageInterface[]): void {
    ws.send(btoa(JSON.stringify({
      type: 'messages',
      data: messages,
    } as WebSocketMessageDataInterface)));
  }

  static sendUserToAllClients(wss: WebSocket.Server, user: UserInterface): void {
    wss.clients.forEach(client => client.send(btoa(JSON.stringify({
      type: 'user',
      data: user,
    } as WebSocketMessageDataInterface))));
  };

  static sendAllUsersToClient(ws: WebSocket, users: UserInterface[]): void {
    ws.send(btoa(JSON.stringify({
      type: 'users',
      data: users,
    } as WebSocketMessageDataInterface)));
  }
}
