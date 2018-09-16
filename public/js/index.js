var socket = io();
socket.on('connect',function() {
  console.log('Connected to server');
});

socket.on('newMessage',function(msg){
  console.log('new meassage',msg);
  var li=jQuery('<li></li>');
  li.text(`${msg.from}: ${msg.text}`);
  jQuery('#messages').append(li);
});

socket.on('disconnect',function() {
  console.log('disconnected from the server');
});


jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
    from:'user',
    text: jQuery('[name=message]').val()
  },function(){

  });
});

/*
socket.emit('createEmail',{
  to:'gen@capl.com',
  text:'Hey . This is vineet'
});
*/


/*
socket.emit('createMessage',{
  from:'abhay',
  text:'ha beyy'
});
});
*/

/*
socket.on('newEmail',function(email){
  console.log('New Email',email);
});
*/
