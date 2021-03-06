function scrollToBottom(){
//selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
//heights
var clientHeight = messages.prop('clientHeight');
var scrollTop = messages.prop('scrollTop');
var scrollHeight = messages.prop('scrollHeight');
var newMessageHeight = newMessage.innerHeight();
var lastMessageHeight = newMessage.prev().innerHeight();

if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=scrollHeight){
  messages.scrollTop(scrollHeight);
}
}

var socket = io();
socket.on('connect',function() {
  console.log('Connected to server');
});

socket.on('newMessage',function(msg){
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template,{
    text:msg.text,
    from:msg.from,
    createdAt:formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
  /*
  var li=jQuery('<li></li>');
  li.text(`${msg.from} ${formattedTime}: ${msg.text}`);
  jQuery('#messages').append(li);
  */
});

socket.on('newLocationMessage',function(msg){
  var formattedTime = moment(msg.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template,{
    url:msg.url,
    from:msg.from,
    createdAt:formattedTime
  })

  jQuery('#messages').append(html);
  scrollToBottom();
  /*
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');
  li.text(`${msg.from} ${formattedTime}: `);
  a.attr('href',msg.url);
  li.append(a);
  jQuery('#messages').append(li);
  */
});

socket.on('disconnect',function() {
  console.log('disconnected from the server');
});


jQuery('#message-form').on('submit',function(e){
  e.preventDefault();
  var  messageTextBox = jQuery('[name=message]');


  socket.emit('createMessage',{
    from:'user',
    text: messageTextBox.val()
  },function(){
    messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function(){
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your brwoser');
  }
  locationButton.attr('disabled','disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function(){
    locationButton.removeAttr('disabled').text('Send location');
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
