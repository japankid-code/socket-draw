const socket = io();

const imageBoard = new DrawingBoard.Board('drawing-board');

const boardEl = document.getElementById('drawing-board');

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

// sends the client chat message to server when u hit submit
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    socket.emit('client chat message', input.value);
    input.value = '';
  }
});


boardEl.addEventListener('mouseup', () => {})

// chat functionality as appending list elements, rudimentary
socket.on('server chat message', function(msg) {
  // listens for response from server
  let item = document.createElement('li');
  item.textContent = msg;
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

// board interactions here


socket.on('drawing', (drawing) => {
  imageBoard.ev.trigger('board:stopDrawing', drawing);
  // const drawingObj = JSON.parse(drawing);
  console.log(drawing);
})

const drawingEmit = (e) => {
  // const eventObj = JSON.stringify(e);
  console.log(e);
  // broadcast back to server...
  socket.emit('drawing', e);
}

imageBoard.ev.trigger('board:stopDrawing',);


// sets up listener for board on client
imageBoard.ev.bind('board:stopDrawing', drawingEmit);
