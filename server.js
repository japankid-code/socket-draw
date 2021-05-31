const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});



io.on('connection', (socket) => {
  console.log('a user connected');
  // listens from client
  socket.on('client chat message', (msg) => {
    // send back on client
    io.emit('server chat message', msg);
  });

  // listens to board emits from client
  socket.on('drawing', (msg) => {
    // const msgData = JSON.parse(msg);
    console.log(msg)
    // send it to everyone
    io.emit('drawing', msg);
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
