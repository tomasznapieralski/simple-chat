import { AppStateInterface } from '../reducers/index';

export const getMessages = (state: AppStateInterface) => state.chat.messages;
