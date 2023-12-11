import { EPlannerKind } from "../enums/ESocketKind";

export class SocketMessage {
  static text(message: any): string {
    const data = {
      data: message,
    };

    return JSON.stringify(data);
  }

  static ok(): string {
    const data = {
      data: "Ok",
      kind: EPlannerKind.Ok,
    };

    return JSON.stringify(data);
  }
}
