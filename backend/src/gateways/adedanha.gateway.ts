import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { SocketMessage } from "../Dtos/SocketMessage";
import { PlayerService } from "../services/player.service";

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly playerService: PlayerService) {}
  flagShowAllVotes = false;
  selectedIssue = "";

  @WebSocketServer()
  wss: Server;
  handleConnection() {
  }

  handleDisconnect(client: Socket) {
    setTimeout(() => {
      this.playerService.delete(client.data.id);
      const users = [];
      this.wss.sockets.sockets.forEach((socket) => {
        if (socket.data?.id) users.push(socket.data.name);
      });
      this.wss.emit("users", SocketMessage.text(users));
    }, 5000);
  }

  // @SubscribeMessage("reset-votes")
  // async handleResetVotes(): Promise<SocketMessage> {
  //   this.flagShowAllVotes = false;
  //   await this.playerService.clear();
  //   this.wss.emit("new-vote", SocketMessage.text([]));
  //   this.wss.emit("reset", SocketMessage.ok());
  //   this.wss.emit(
  //     "show-average",
  //     SocketMessage.text({ average: 0, votes: [] }),
  //   );

  //   return SocketMessage.ok();
  // }

  // @SubscribeMessage("list-users")
  // handleAskForUsers(): SocketMessage {
  //   const users = [];
  //   this.wss.sockets.sockets.forEach((socket) => {
  //     if (socket.data?.id) users.push(socket.data.name);
  //   });

  //   return SocketMessage.text(users);
  // }

  // @SubscribeMessage("show-average")
  // async handleShowAverage(): Promise<SocketMessage> {
  //   this.flagShowAllVotes = true;
  //   const votes = await this.playerService.findAll();
  //   let average = 0;

  //   const total = (votes || []).reduce(
  //     (acc, user) => acc + user?.vote ?? 0,
  //     0,
  //   );
  //   if (votes.length > 0) average = Math.round(total / votes.length);

  //   this.wss.emit(
  //     "show-average",
  //     SocketMessage.text({ average, votes }),
  //   );

  //   return SocketMessage.ok();
  // }

  // @SubscribeMessage("select-issue")
  // async handleSelectIssue(
  //   @MessageBody() data: string,
  //   @ConnectedSocket() client: Socket,
  // ): Promise<SocketMessage> {
  //   if (!client.data.id) {
  //     return SocketMessage.text("You must identify yourself first");
  //   }

  //   this.selectedIssue = data;
  //   this.wss.emit(
  //     "selected-issue",
  //     SocketMessage.text(data),
  //   );

  //   return SocketMessage.ok();
  // }
  // @SubscribeMessage("remove-issue")
  // async handleRemoveIssue(
  //   @ConnectedSocket() client: Socket,
  // ): Promise<SocketMessage> {
  //   if (!client.data.id) {
  //     return SocketMessage.text("You must identify yourself first");
  //   }
  //   this.selectedIssue = "";
  //   this.wss.emit(
  //     "selected-issue",
  //     SocketMessage.text(""),
  //   );

  //   return SocketMessage.ok();
  // }

  @SubscribeMessage("identify")
  async handleIdentify(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<SocketMessage> {
    // const body = JSON.parse(data);
    // const { name } = body
    // client.data.id = data;
    // client.data.name = user.name;

    // const id = new Guid().value;
    // const user = await this.playerService.create(id, );

    return SocketMessage.ok();
  }
}
