import path from 'path';
import WebSocket from 'ws';
import express from 'express';
import http from 'http';

import { WebSocketMessageDataInterface } from '../src/app/store/interfaces/websockets';
import { MessageInterface } from '../src/app/store/interfaces/messages';
import { UserInterface } from '../src/app/store/interfaces/users';

import { atob } from './utils/base64';

import { Users } from './classes/users';
import { Messages } from './classes/messages';
import { Communication } from './classes/communication';

const app = express()
  .use(express.static(path.join(__dirname, '../../build')))
  .get('*', function(request, response) {
    response.sendfile(path.join(__dirname, '../../build/index.html'));
  })
;

const port = process.env.PORT || 8080;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const users = new Users();
const messages = new Messages();

wss.on('connection', (ws: WebSocket) => {
  let myUser: UserInterface | null = null;

  ws.on('message', (data) => {
    const parseData: WebSocketMessageDataInterface | undefined = JSON.parse(atob(data.toString()));

    if (parseData) {
      switch (parseData.type) {
        case 'my-user': {
          myUser = { ...(parseData.data as UserInterface) };
          users.addOrUpdate(myUser);
          Communication.sendAllUsersToClient(ws, users.getAllUsers());
          Communication.sendAllMessagesToClient(ws, messages.getAllMessages());
          Communication.sendUserToAllClients(wss, myUser);

          const message = messages.addBotMessage(`${myUser.name} joined.`, users.getBotUserId());

          Communication.sendMessageToAllClients(wss, message);

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

      const message = messages.addBotMessage(`${myUser.name} left.`, users.getBotUserId());

      Communication.sendMessageToAllClients(wss, message);
    }
  });
});

server.listen(port, () => console.log(`> Listening on port: ${port}`));
