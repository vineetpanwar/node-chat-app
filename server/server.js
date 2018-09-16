const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

var {generateMessage,generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
var port = process.env.PORT || 3000;


var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app!'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','A new User has joined!'));

  socket.on('createMessage',(msg,callback) =>{
    console.log('message',msg);
    io.emit('newMessage',generateMessage(msg.from,msg.text));
    callback('This is from the server');
  });

  socket.on('createLocationMessage',(coords) => {
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });


  socket.on('disconnect', () => {
    console.log('new user disconnected');
  });
});

server.listen(port,() => {
  console.log(`server is up on port ${port}`);
});



/*
socket.on('createEmail',(newEmail) => {
  console.log('email sent',newEmail);
});
*/

/*
  socket.emit('newEmail',{
    from:'vine@gmail.com',
    text:'hi how are you',
    createdAt:123
  });
  */

  /*
  socket.emit('newMessage',{
    from:'vineet',
    text:'hello',
    createdAt:123
  })
  */
