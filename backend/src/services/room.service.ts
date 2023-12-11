import { Inject, Injectable } from "@nestjs/common";
import { MongoRepository } from "typeorm";
import { RoomRepositoryName } from "../providers/adedanha.provider";
import { Room } from "../entities/room.entity";

@Injectable()
export class RoomService {
  constructor(
    @Inject(RoomRepositoryName) private roomRepository: MongoRepository<
      Room
    >,
  ) {}

  async findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  async findById(id: string): Promise<Room> {
    return this.roomRepository.findOne({ where: { id } });
  }

  async create(payload: Room): Promise<Room> {
    try {
      const doc = await this.roomRepository.insertOne(payload);
      if (!doc) return null;

      return new Room(payload.id);
    } catch {
      console.log("Duplicate entry");
    }
  }
}
