import { Module } from "@nestjs/common";
import { GameGateway } from "../gateways/adedanha.gateway";
import { gameProviders } from "../providers/adedanha.provider";
import { DatabaseModule } from "../database/database.module";
import { PlayerService } from "../services/player.service";

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [
    ...gameProviders,
    PlayerService,
    GameGateway,
  ],
})
export class GameModule {}
