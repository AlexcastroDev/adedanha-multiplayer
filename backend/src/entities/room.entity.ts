import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player.entity";

@Entity()
export class Room {
  constructor(id: string) {
    this.id = id;
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => Player, (player) => player.room)
  players: Player[];
}
