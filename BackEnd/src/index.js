const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const port = 3000;

var queue= [];
var lobbies = new Map()

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
    queue = queue.filter(id => id !== socket.id);
    console.log(queue);
  });

  socket.on('playOnline' , (id , message) => {
    if (!queue.includes(socket.id)) {
      queue.push(socket.id)
    }

    if (queue.length >= 2){
      const p1 = queue.shift();
      const p2 = queue.shift();
      const lobbyId = `${p1}-${p2}`;

      lobbies.set(lobbyId , {
        gameId:lobbyId,
        player1:p1,
        player2:p2,
        status:"Progess",
        result:"",
        winner:"",
        gameData:[
          {
            id:1,
            class:"bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
            icon_link:"",
            item:""
          },
          {
            id:2,
            class:"bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
            icon_link:"",
            item:""
          },
          {
            id:3,
            class:"bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
            icon_link:"",
            item:""
          },
          {
            id:4,
            class:"bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
            icon_link:"",
            item:""
          },
          {
            id:5,
            class:"bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
            icon_link:"",
            item:""
          },
          {
            id:6,
            class:"bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
            icon_link:"",
            item:""
          },
          {
            id:7,
            class:"bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
            icon_link:"",
            item:""
          },
          {
            id:8,
            class:"bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
            icon_link:"",
            item:""
          },
          {
            id:9,
            class:"bg-purple-300 rounded-lg w-48 h-48 flex items-center justify-center",
            icon_link:"",
            item:""
          },
        ],
      });
    socket.join(lobbyId);
    io.to(p1).emit('joinedLobby', { id:lobbyId, gameInfo:lobbies.get(lobbyId)});
    io.to(p2).emit('joinedLobby', { id:lobbyId, gameInfo:lobbies.get(lobbyId)});
    }
    console.log(queue)
  })
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));