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
import { Guid } from "../Dtos/Guid";
import { PlayerName } from "../Dtos/PlayerName";
import { RoomService } from "../services/room.service";
import { Room } from "../entities/room.entity";

@WebSocketGateway({ cors: true })
export class GameGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly playerService: PlayerService,
    private readonly roomService: RoomService,
  ) {}
  flagShowAllVotes = false;
  selectedIssue = "";

  @WebSocketServer()
  wss: Server;
  handleConnection() {
    console.log("client connected");
  }

  handleDisconnect(client: Socket) {
    console.log("client left");

    setTimeout(() => {
      this.playerService.delete(client.data.id);
      const users = [];
      this.wss.sockets.sockets.forEach((socket) => {
        if (socket.data?.id) users.push(socket.data.name);
      });
      this.wss.emit("users", SocketMessage.text(users));
    }, 5000);
  }

  @SubscribeMessage("updatePlayersAtRoom")
  async handleListUserRooms(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<SocketMessage> {
    if (!client.data.id) {
      return SocketMessage.fail("You must identify yourself first");
    }
    const body = JSON.parse(data);
    const players = await this.playerService.findPlayersRoom(body);

    if (!players) return SocketMessage.fail("Error listing players");

    return SocketMessage.text(players);
  }

  @SubscribeMessage("leaveRoom")
  async handleLeaveRoom(
    @ConnectedSocket() client: Socket,
  ): Promise<SocketMessage> {
    if (!client.data.id) {
      return SocketMessage.fail("You must identify yourself first");
    }
    const player = await this.playerService.updatePlayerRoom(
      client.data.id,
      null,
    );

    if (!player) return SocketMessage.fail("Error leaving room");

    return SocketMessage.ok();
  }

  @SubscribeMessage("createRoom")
  async handleCreateRoom(
    @ConnectedSocket() client: Socket,
  ): Promise<SocketMessage> {
    if (!client.data.id) {
      return SocketMessage.fail("You must identify yourself first");
    }
    const roomId = new Guid().value;
    const room = new Room(roomId);
    const roomResult = await this.roomService.create(room);

    const player = await this.playerService.updatePlayerRoom(
      client.data.id,
      roomId,
    );

    if (!player || !roomResult) {
      return SocketMessage.fail("Error creating room");
    }

    return SocketMessage.ok();
  }

  @SubscribeMessage("identify")
  async handleIdentify(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): Promise<SocketMessage> {
    const body = JSON.parse(data);
    const playerName = new PlayerName(body.name);
    if (!playerName.isValid) return SocketMessage.fail("Invalid name");

    const id = new Guid().value;
    const player = await this.playerService.create({
      id,
      name: playerName.value,
      room: null,
    });

    if (!player) return SocketMessage.fail("Error creating player");

    client.data.id = id;

    return SocketMessage.identity(player);
  }
}
