import { Inject, Injectable } from "@nestjs/common";
import { MongoRepository } from "typeorm";
import { Player } from "../entities/player.entity";
import {
  PlayerRepositoryName,
  RoomRepositoryName,
} from "../providers/adedanha.provider";
import { Room } from "../entities/room.entity";

@Injectable()
export class PlayerService {
  constructor(
    @Inject(PlayerRepositoryName) private playerRepository: MongoRepository<
      Player
    >,
    @Inject(RoomRepositoryName) private roomRepository: MongoRepository<
      Room
    >,
  ) {}

  async findAll(): Promise<Player[]> {
    return await this.playerRepository.find();
  }

  async findByUserId(id: string): Promise<Player> {
    return await this.playerRepository.findOne({ where: { id } });
  }

  async create(payload: Player): Promise<Player> {
    try {
      const doc = await this.playerRepository.insertOne(payload);
      if (!doc) return null;

      return new Player(
        payload.id,
        payload.name,
        null,
      );
    } catch {
      console.log("Duplicate entry");
    }
  }

  async updatePlayerRoom(id: string, room: string) {
    try {
      const hasRoom = await this.roomRepository.findOne({
        where: { id: room },
      });

      if (!hasRoom) {
        return null;
      }
      const document = await this.playerRepository.findOneAndUpdate({
        id,
      }, {
        $set: {
          room: room,
        },
      }, { returnDocument: "after" });

      return new Player(
        document.value.id,
        document.value.name,
        document.value.room,
      );
    } catch (e) {
      return null;
    }
  }

  async delete(id: string) {
    return this.playerRepository.delete({ id });
  }
}
