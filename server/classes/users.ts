import uuid from 'uuid';

import { UserInterface } from '../../src/app/store/interfaces/users';

export class Users {
  private data: UserInterface[];
  private botUserId: string;

  constructor() {
    const botUser: UserInterface = {
      id: uuid(),
      name: 'ChatBOT',
      active: false,
      isBot: true,
    };

    this.data = [botUser];
    this.botUserId = botUser.id;
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

  getBotUserId(): string {
    return this.botUserId;
  }
};
