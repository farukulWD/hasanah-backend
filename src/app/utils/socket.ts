import { Server } from "socket.io";

import { Server as HttpServer } from "http";

import { Server as SocketIOServer, Socket } from "socket.io";

let io: SocketIOServer;

interface InitializeSocketIO {
  (server: HttpServer): SocketIOServer;
}

const initializeSocketIO: InitializeSocketIO = (server) => {
  io = new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: "*",
    },
  });

  try {
    io.on("connection", (socket: Socket) => {
      console.log("New client connected");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  } catch (e: any) {
    console.log(e.message);
  }

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO is not initialized");
  }
  return io;
};

export { initializeSocketIO, getIO };
