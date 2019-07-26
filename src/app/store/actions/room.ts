import { Action, Dispatch } from 'redux';

const prefix = '[ROOM]';

export const ROOM_INIT = `${prefix} INIT`;

export interface RoomInitAction extends Action {
  dispatch: Dispatch;
}

export const roomInit = (dispatch: Dispatch): RoomInitAction => ({
  type: ROOM_INIT,
  dispatch,
});
