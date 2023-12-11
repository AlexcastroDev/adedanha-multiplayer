import { Inject, Injectable } from "@nestjs/common";
import { MongoRepository } from "typeorm";
import { Player } from "../entities/player.entity";
import { PlayerRepositoryName } from "../providers/adedanha.provider";

@Injectable()
export class PlayerService {
  constructor(
    @Inject(PlayerRepositoryName) private playerRepository: MongoRepository<
      Player
    >,
  ) {}

  async findAll(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async findByUserId(id: string): Promise<Player> {
    return this.playerRepository.findOne({ where: { id } });
  }

  async create(payload: Player): Promise<Player> {
    try {
      const doc = await this.playerRepository.insertOne(payload);
      const player = this.findByUserId(String(doc.insertedId));
      return player;
    } catch {
      console.log("Duplicate entry");
    }
  }

  async updatePlayerRoom(id: string, room: string) {
    try {
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

  async clear() {
    return this.playerRepository.clear();
  }

  async deleteByUserId(id: string) {
    return this.playerRepository.delete({ id });
  }
}
