import { Action } from 'redux';

import {
  WEBSOCKET_OPEN,
  WEBSOCKET_CLOSE,
  WebSocketOpenAction,
} from '../actions/websocket';

export interface WebSocketReducerInterface {
  webSocket: WebSocket | null;
}

const defaultState: WebSocketReducerInterface = {
  webSocket: null,
};

export default (state = defaultState, action: Action): WebSocketReducerInterface => {
  switch (action.type) {
    case WEBSOCKET_OPEN: {
      return {
        ...state,
        webSocket: (action as WebSocketOpenAction).webSocket,
      };
    }
    case WEBSOCKET_CLOSE: {
      return {
        ...state,
        webSocket: null,
      };
    }
    default: {
      return state;
    }
  }
};
