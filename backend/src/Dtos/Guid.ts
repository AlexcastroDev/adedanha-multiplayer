import { randomUUID } from "node:crypto";

export class Guid {
  value: string;

  constructor() {
    let uuid = randomUUID();
    this.value = uuid;
  }
}
