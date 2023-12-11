import { DataSource } from "typeorm";
import { Player } from "../entities/player.entity";
import { Room } from "../entities/room.entity";

export const PlayerRepositoryName = "PLAYER_REPOSITORY";
export const RoomRepositoryName = "ROOM_REPOSITORY";

export const gameProviders = [
  {
    provide: PlayerRepositoryName,
    useFactory: (dataSource: DataSource) =>
      dataSource.getMongoRepository(Player),
    inject: ["DATA_SOURCE"],
  },
  {
    provide: RoomRepositoryName,
    useFactory: (dataSource: DataSource) => dataSource.getMongoRepository(Room),
    inject: ["DATA_SOURCE"],
  },
];
