import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player.entity";

@Entity()
export class Room {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  invite: string;

  @OneToMany(() => Player, (player) => player.room)
  players: Player[];
}
