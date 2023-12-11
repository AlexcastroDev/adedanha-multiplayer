import { Test, TestingModule } from "@nestjs/testing";
import { GameModule } from "../modules/adedanha.module";
import { PlayerService } from "./player.service";
import { Guid } from "../Dtos/Guid";
import { Room } from "src/entities/room.entity";

describe("PlayerService", () => {
  let playerService: PlayerService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [GameModule],
    }).compile();

    playerService = app.get<PlayerService>(PlayerService);
  });

  it("Should create a Player", async () => {
    const id = new Guid().value;

    await playerService.create({
      id,
      name: "Alekinho",
      room: null,
    });

    expect(await playerService.findByUserId(id)).toEqual({
      id,
      name: "Alekinho",
    });
  });
  it("Should set a room to a player", async () => {
    const id = new Guid().value;
    const room = new Guid().value;

    await playerService.create({
      id,
      name: "Alekinho",
      room: null,
    });

    await playerService.updatePlayerRoom(id, room);

    expect(await playerService.findByUserId(id)).toEqual({
      id,
      name: "Alekinho",
    });
  });
});
