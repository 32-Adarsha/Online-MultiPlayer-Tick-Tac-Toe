const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" },
});

const port = 3000;

let queue = [];
let lobbies = new Map();

io.on("connection", (socket) => {
  console.log("a user connected:", socket.id);

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected:", socket.id);
    queue = queue.filter((id) => id !== socket.id);
  });

  socket.on("playOnline", (id, message) => {
    if (!queue.includes(socket.id)) {
      queue.push(socket.id);
    }

    if (queue.length >= 2) {
      const p1 = queue.shift();
      const p2 = queue.shift();
      const lobbyId = `${p1}-${p2}`;

      lobbies.set(lobbyId, {
        gameId: lobbyId,
        player1: p1,
        player2: p2,
        status: "Progress",
        turn: p1,
        totalMove: 0,
        result: "",
        winner: "",
        chat: [],
        gameData: [
          {
            id: 1,
            class:
              "bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
            icon_link: "",
            item: "",
          },
          {
            id: 2,
            class:
              "bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
            icon_link: "",
            item: "",
          },
          {
            id: 3,
            class:
              "bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
            icon_link: "",
            item: "",
          },
          {
            id: 4,
            class:
              "bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
            icon_link: "",
            item: "",
          },
          {
            id: 5,
            class:
              "bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
            icon_link: "",
            item: "",
          },
          {
            id: 6,
            class:
              "bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
            icon_link: "",
            item: "",
          },
          {
            id: 7,
            class:
              "bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
            icon_link: "",
            item: "",
          },
          {
            id: 8,
            class:
              "bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
            icon_link: "",
            item: "",
          },
          {
            id: 9,
            class:
              "bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
            icon_link: "",
            item: "",
          },
        ],
      });

      socket.join(lobbyId);
      io.sockets.sockets.get(p1).join(lobbyId);
      io.sockets.sockets.get(p2).join(lobbyId);

      io.to(p1).emit("joinedLobby", {
        id: lobbyId,
        yourId: p1,
        gameInfo: lobbies.get(lobbyId),
      });
      io.to(p2).emit("joinedLobby", {
        id: lobbyId,
        yourId: p2,
        gameInfo: lobbies.get(lobbyId),
      });
    }
  });

  socket.on("gameMessage", (lobbyId, message) => {
    io.to(lobbyId).emit("gameUpdate", message);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
