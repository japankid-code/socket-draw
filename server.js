const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const PORT = process.env.PORT || '3001';

app.use(express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.broadcast.emit("hello", "world");
//   // listens from client
//   socket.on('client chat message', (msg) => {
//     // send back on client
//     io.emit('server chat message', msg);
//   });
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

io.sockets.on('connection', (socket) => {
	console.log('Client connected: ' + socket.id)

	socket.on('mouse', (data) => socket.broadcast.emit('mouse', data))

	socket.on('disconnect', () => console.log('Client has disconnected'))
})


server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
