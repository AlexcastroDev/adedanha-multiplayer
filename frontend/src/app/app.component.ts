import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { IdentityEmitter } from "@internal/events";
import { io } from "socket.io-client";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "frontend";
  socketURL = "ws://localhost:8080";
  socket: any;

  // TODO: remove this - just for testing
  createRoom() {
    this.socket.emit("createRoom");
  }

  ngOnInit() {
    const socket = io(this.socketURL);
    this.socket = socket;
    socket.on("connect", () => {
      console.log("Connected to server");
      const player = new IdentityEmitter("test");
      socket.emit("identify", player.payload);
    });
  }
}
