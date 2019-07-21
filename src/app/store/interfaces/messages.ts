export interface MessageInterface {
  timestamp: number;
  id: string;
  text: string;
  userId: string;
  status: 'created' | 'edited' | 'deleted';
}
