import { io } from "socket.io-client";
import { test, describe, it } from "node:test";
import { deepEqual, notDeepEqual } from "node:assert";
import { IdentityEmitter, SocketEvent } from "@internal/events";

const socketURL = "ws://localhost:8080";

async function createSocket() {
  const socket = io(socketURL);

  return new Promise((resolve) => {
    socket.on("connect", async () => {
      const player = new IdentityEmitter("test");
      const data = await socket.emitWithAck("identify", player.payload);
      const user = IdentityEmitter.parse(data);
      resolve({
        user,
        socket
      })
    });

  });
}

describe("Simulate Game", () => {
  it("Should enter with name", async () => {
    const { socket, user } = await createSocket()
    const { name, id } = user
    deepEqual(name, "test")
    notDeepEqual(id, undefined);

    socket.disconnect();
  })

  it("Should create a room", async () => {
    const { socket } = await createSocket()

    const payload = await socket.emitWithAck("createRoom");
    const room = SocketEvent.parse(payload);

    deepEqual(room.isOk, true);
    socket.disconnect()
  })
  it("Should leave room", async () => {
    const { socket } = await createSocket()
    await socket.emitWithAck("createRoom");
    const payload = await socket.emitWithAck("leaveRoom");
    const room = SocketEvent.parse(payload);

    deepEqual(room.isOk, true);
    socket.disconnect();
  })
})

test("Multiplayer should update rooms", async () => {
  const { socket } = await createSocket()
  const { socket: socket2 } = await createSocket()

  socket.on("roomCreated", (data) => {
    const rooms = SocketEvent.parse(data);
    deepEqual(rooms.isOk, true);
  })
  socket2.on("roomCreated", (data) => {
    const rooms = SocketEvent.parse(data);
    deepEqual(rooms.isOk, true);
  })

  await socket.emitWithAck("createRoom");
  socket.disconnect();
  socket2.disconnect();
})
