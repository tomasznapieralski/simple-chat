import { AppStateInterface } from '../reducers/index';

export const getWebSocket = (state: AppStateInterface) => state.webSocket.webSocket;
