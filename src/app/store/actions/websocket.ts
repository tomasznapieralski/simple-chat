import { Action, Dispatch } from 'redux';

const prefix = '[WEBSOCKET]';

export const WEBSOCKET_OPEN = `${prefix} OPEN`;
export const WEBSOCKET_ERROR = `${prefix} ERROR`;
export const WEBSOCKET_MESSAGE = `${prefix} MESSAGE`;
export const WEBSOCKET_CLOSE = `${prefix} CLOSE`;
export const WEBSOCKET_RECONNECT = `${prefix} RECONNECT`;
export const WEBSOCKET_REGISTER_USER = `${prefix} REGISTER_USER`;

export interface WebSocketOpenAction extends Action {
  webSocket: WebSocket;
}

export interface WebSocketMessageAction extends Action {
  message: any;
}

export interface WebSocketCloseAction extends Action {
  dispatch: Dispatch
}

export interface WebSocketReconnectAction extends Action {
  dispatch: Dispatch
}

export interface WebSocketRegisterUserAction extends Action {
  id: string;
}

export const webSocketOpen = (webSocket: WebSocket): WebSocketOpenAction => ({
  type: WEBSOCKET_OPEN,
  webSocket,
});

export const webSocketError = (): Action => ({
  type: WEBSOCKET_ERROR,
});

export const webSocketMessage = (message: any): WebSocketMessageAction => ({
  type: WEBSOCKET_MESSAGE,
  message,
});

export const webSocketClose = (dispatch: Dispatch): WebSocketCloseAction => ({
  type: WEBSOCKET_CLOSE,
  dispatch,
});

export const webSocketReconnect = (dispatch: Dispatch): WebSocketReconnectAction => ({
  type: WEBSOCKET_RECONNECT,
  dispatch,
});

export const webSocketRegisterUser = (id: string): WebSocketRegisterUserAction => ({
  type: WEBSOCKET_REGISTER_USER,
  id
});
