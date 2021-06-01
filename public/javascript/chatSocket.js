const socket = io();

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

// chat functions as appending list elements, rudimentary
// listens for response from server
socket.on('server chat message', function(msg) {
  let item = document.createElement('li');
  item.textContent = msg;
  // manipulate DOM elements to provide chat display.
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

const drawingEmit = (e, emitted) => {
  // broadcast back to server...
  console.log(emitted)
  if (emitted === undefined) {
    socket.emit('drawing', e);
  }
}
