import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "./room.entity";

@Entity()
export class Player {
  constructor(id: string, name: string, room: Room) {
    this.id = id;
    this.name = name;
    this.room = room as Room;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Room, (room) => room.id)
  room: Room;
}
