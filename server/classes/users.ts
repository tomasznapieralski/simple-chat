import { UserInterface } from '../../src/app/store/interfaces/users';

export class Users {
  private data: UserInterface[];

  constructor() {
    this.data = [];
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
};
