import { Inject, Injectable } from "@nestjs/common";
import { MongoRepository, ObjectId, Repository } from "typeorm";
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

  async create(planner: Player): Promise<Player> {
    try {
      const doc = await this.playerRepository.insertOne(planner);
      const player = this.findByUserId(String(doc.insertedId));
      return player;
    } catch {
      console.log("Duplicate entry");
    }
  }

  async updatePlayerRoom(id: string, room: string) {
    return this.playerRepository.update(id, {
      room: () => room,
    });
  }

  async clear() {
    return this.playerRepository.clear();
  }

  async deleteByUserId(id: string) {
    return this.playerRepository.delete({ id });
  }
}
