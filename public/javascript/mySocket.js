const socket = io();

const imageBoard = new DrawingBoard.Board('drawing-board',{
  controlsPosition: 'bottom',
	color: '#000000',
	webStorage: false
});

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


boardEl.addEventListener('', () => {
  imageBoard.ev.trigger('board:drawing', drawing);

})

// chat functions as appending list elements, rudimentary
// listens for response from server
socket.on('server chat message', function(msg) {
  let item = document.createElement('li');
  item.textContent = msg;
  // manipulate DOM elements to provide chat display.
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

// board interactions here

// listens for response from server for drawing
socket.on('drawing', (drawing) => {
  // do the drawing on the other client side
  // ...
  imageBoard.ev.trigger('board:drawing', drawing, true);
  console.log(drawing)

})

const drawingEmit = (e, emitted) => {
  // broadcast back to server...
  console.log(emitted)
  if (emitted === undefined) {
    socket.emit('drawing', e);
  }
}

// sets up listener for board on client
imageBoard.ev.bind('board:drawing', drawingEmit);
