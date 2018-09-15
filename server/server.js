const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public');
var port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

/*
  socket.emit('newEmail',{
    from:'vine@gmail.com',
    text:'hi how are you',
    createdAt:123
  });
  */

  socket.emit('newMessage',{
    from:'vineet',
    text:'hello',
    createdAt:123
  })

  socket.on('createMessage',(msg) =>{
    console.log('message',msg);
  });

  /*
  socket.on('createEmail',(newEmail) => {
    console.log('email sent',newEmail);
  });
  */

  socket.on('disconnect', () => {
    console.log('new user disconnected');
  });
});

server.listen(port,() => {
  console.log(`server is up on port ${port}`);
});
