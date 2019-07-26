import { MessageInterface } from '../../src/app/store/interfaces/messages';

export class Messages {
  private data: MessageInterface[];

  constructor() {
    this.data = [];
  }

  addOrUpdate(message: MessageInterface): void {
    const messageIndex = this.data.findIndex(data => data.id === message.id);

    this.data = messageIndex > -1
      ? this.data.map(data => data.id !== message.id ? data : { ...message })
      : [...this.data, { ...message }]
    ;
  }

  getAllMessages(): MessageInterface[] {
    return this.data;
  }
}
