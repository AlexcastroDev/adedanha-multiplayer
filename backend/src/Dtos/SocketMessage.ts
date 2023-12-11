import { EPlannerKind } from "../enums/ESocketKind";

export class SocketMessage {
  static text(message: any): string {
    const data = {
      data: message,
      kind: EPlannerKind.Ok,
    };

    return JSON.stringify(data);
  }

  static fail(message: any): string {
    const data = {
      data: message,
      kind: EPlannerKind.Fail,
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

  static identity(data: any): string {
    return JSON.stringify(data);
  }
}
