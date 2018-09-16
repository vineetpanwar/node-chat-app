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

socket.on('newLocationMessage',function(msg){
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');
  li.text(`${msg.from}`);
  a.attr('href',msg.url);
  li.append(a);
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

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your brwoser');
  }
  navigator.geolocation.getCurrentPosition(function(position) {
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function(){
    alert('Unable to access your current location');
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
