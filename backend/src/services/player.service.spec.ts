import { Test, TestingModule } from "@nestjs/testing";
import { GameModule } from "../modules/adedanha.module";
import { PlayerService } from "./player.service";
import { Guid } from "../Dtos/Guid";

describe("PlayerService", () => {
  let playerService: PlayerService;
  let app: TestingModule;
  beforeEach(async () => {
    if (playerService) return;
    app = await Test.createTestingModule({
      imports: [GameModule],
    }).compile();

    playerService = app.get<PlayerService>(PlayerService);
  });
  afterEach(async () => {
    app.close();
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
    const room_id = new Guid().value;

    await playerService.create({
      id,
      name: "Alekinho hub",
      room: null,
    });

    const player = await playerService.updatePlayerRoom(id, room_id);

    expect(player).toEqual({
      id,
      name: "Alekinho hub",
      room: room_id,
    });
  });
});
