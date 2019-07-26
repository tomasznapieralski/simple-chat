import WebSocket from 'ws';

import { WebSocketMessageDataInterface } from '../../src/app/store/interfaces/websockets';
import { MessageInterface } from '../../src/app/store/interfaces/messages';
import { UserInterface } from '../../src/app/store/interfaces/users';

export class Communication {
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
