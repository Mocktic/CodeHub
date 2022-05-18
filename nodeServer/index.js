// node server which will handle socket io connections
const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{
  // notification of new user joining
    socket.on('new-user-joined', name =>{
      // console.log("New user", name)
      users[socket.id] = name;
      socket.broadcast.emit('user-joined', name);
    });
// broadcast of sent message
    socket.on('send', message =>{
      socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

// broadcast when someone leaves the chat here disconnect is build in event
    socket.on('disconnect', message =>{
      socket.broadcast.emit('left', users[socket.id]);
      delete users[socket.id];
    });
  })
