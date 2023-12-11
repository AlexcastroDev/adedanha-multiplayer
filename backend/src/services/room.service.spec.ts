import { Test, TestingModule } from "@nestjs/testing";
import { GameModule } from "../modules/adedanha.module";
import { PlayerService } from "./player.service";
import { Guid } from "../Dtos/Guid";
import { RoomService } from "./room.service";

describe("PlayerService", () => {
  let playerService: PlayerService;
  let roomService: RoomService;
  let app: TestingModule;

  beforeEach(async () => {
    if (playerService) return;
    app = await Test.createTestingModule({
      imports: [GameModule],
    }).compile();

    playerService = app.get<PlayerService>(PlayerService);
    roomService = app.get<RoomService>(RoomService);
  });
  afterEach(async () => {
    app.close();
  });

  it("Should create a room", async () => {
    const id = new Guid().value;
    const invite = new Guid().value;

    await roomService.create({
      id,
      invite,
      players: [],
    });

    expect(await roomService.findById(id)).toEqual({
      id,
      invite,
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
    await roomService.create({
      id: room_id,
      invite: "123",
      players: [],
    });

    const player = await playerService.updatePlayerRoom(id, room_id);

    expect(player).toEqual({
      id,
      name: "Alekinho hub",
      room: room_id,
    });
  });
  it("Should delete room register", async () => {
    const id = new Guid().value;
    const invite = new Guid().value;

    await roomService.create({
      id,
      invite,
      players: [],
    });

    await playerService.delete(id);

    const playerDeleted = await playerService.findByUserId(id);
    expect(playerDeleted).toEqual(null);
  });
});
