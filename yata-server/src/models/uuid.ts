import { v4 as uuidv4 } from 'uuid';

export class Uuid {
  public static generateUuid(): string {
    return uuidv4();
  }
}
