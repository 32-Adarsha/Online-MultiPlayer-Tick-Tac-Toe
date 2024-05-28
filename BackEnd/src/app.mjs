import { Server } from 'socket.io';
import express from 'express';
import { createServer } from 'node:http';

const app = express();
const server = createServer(app);
const io = new Server(server);  // Corrected line: Use 'new' keyword

io.on('connection', (socket) => {
    console.log('a user connected');

    const joinGlobalChat = () =>{
        socket.join("globalChat" , () => console.log(`socket ${socket.id} joined Global Chat Room` ))
    }


    joinGlobalChat();

    socket.on("globalChat", message => {
        io.emit("newMessage" , message)
    })


});

server.listen(3000, () => {
    console.log('server running at http://localhost:3000');
});