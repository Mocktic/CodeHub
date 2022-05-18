// node server which will handle socket io connections
const io = require('socket.io')(8000)

const users = {};

io.on(
  'connection', socket =>{
    socket.on('new-user-joined', name =>{
      console.log("New user", name)
      user[socket.id] = name;
      socket.broadcase.emit('user-joined', name);
    });

    socket.on('send', message =>{
      socket.broadcast.emit('receive', {message: message, name: user[socket.id]})
    });
  })