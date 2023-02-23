const Product = require('./models/Product');

function websockets(io) {
  io.on('connection', (socket) => {
    socket.on('connect', () => {
      socket.emit('server:init', 'se establecio la conexion');
    });

    socket.broadcast.emit('server:new-client', socket.id);

    socket.emit('server:welcome-client', socket.id);
  });
}

module.exports = websockets;
