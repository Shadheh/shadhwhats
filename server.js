
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  socket.on('join-room', (room) => {
    socket.join(room);
  });

  socket.on('message', ({ room, message }) => {
    socket.to(room).emit('message', message);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('ShadsApp running on port ' + PORT));
