import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player.entity";

@Entity()
export class Room {
  constructor(id: string, invite: string, players: Player[]) {
    this.id = id;
    this.invite = invite;
    this.players = players as Player[];
  }

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  invite: string;

  @OneToMany(() => Player, (player) => player.room)
  players: Player[];
}
