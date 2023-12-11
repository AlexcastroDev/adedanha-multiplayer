import { Module } from "@nestjs/common";
import { GameGateway } from "../gateways/adedanha.gateway";
import { gameProviders } from "../providers/adedanha.provider";
import { DatabaseModule } from "../database/database.module";
import { PlayerService } from "../services/player.service";
import { RoomService } from "../services/room.service";

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    ...gameProviders,
    PlayerService,
    RoomService,
    GameGateway,
  ],
})
export class GameModule {}
