var socket = io();
socket.on('connect',function() {
  console.log('Connected to server');

  /*
  socket.emit('createEmail',{
    to:'gen@capl.com',
    text:'Hey . This is vineet'
  });
  */


  socket.emit('createMessage',{
    from:'abhay',
    text:'ha beyy'
  });
});

socket.on('newMessage',function(msg){
  console.log('new meassage',msg);
});

/*
socket.on('newEmail',function(email){
  console.log('New Email',email);
});
*/

socket.on('disconnect',function() {
  console.log('disconnected from the server');
});
