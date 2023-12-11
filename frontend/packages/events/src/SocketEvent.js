import { ESocketKind } from "./ESocketKind.js";

export class SocketEvent {
  constructor(kind, payload) {
    this.kind = kind;
    this.payload = payload;
  }

  get isOk() {
    return this.kind === ESocketKind.Ok;
  }

  static parse(data) {
    const parsed = JSON.parse(data);

    return new SocketEvent(parsed.kind, parsed.payload);
  }
}
