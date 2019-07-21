import { Action } from 'redux';

const prefix = '[WELCOME]';

export const WELCOME_SUBMIT_MY_USER_NAME = `${prefix} SUBMIT_MY_USER_NAME`;

export interface WelcomeSubmitMyUserNameAction extends Action {
  name: string;
}

export const welcomeSubmitMyUserName = (name: string): WelcomeSubmitMyUserNameAction => ({
  type: WELCOME_SUBMIT_MY_USER_NAME,
  name,
});
