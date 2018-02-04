var socket = io();
socket.on('connect', function () {
    console.log('Connecteed to server');

});


socket.on('newMessage', function (message) {
    console.log('new message', message);
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    li.text(message.from + ' ' + formattedTime + ' ' + message.text);
    $('#messages').append(li);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newLocationMessage', function (message) {
    console.log('New location message', message);
    var formattedTime = moment(message.createdAt).format('h:mm a');    
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current location</a>');
    li.text(message.from + ' ' + formattedTime + ' ')
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageTextBox = $('[name=message]');

    if(!messageTextBox.val()) {
        return swal({
            type: 'error',
            title: 'Oops...',
            text: 'Please write message!',
          });
    } 

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        console.log('Fired from form');
        messageTextBox.val('');
    });

});

var locationButton = $('#send-location');
locationButton.on('click', function (e) {

    if (!navigator.geolocation) {
        return swal({
            type: 'error',
            title: 'Oops...',
            text: 'Geolocation is not supported!',
          });
    };

    locationButton.attr('disabled', 'disabled').text('Sending location...');


    navigator.geolocation.getCurrentPosition(function (position) {
        console.log('Current position', position);
        socket.emit('createLocationMessage', {
            accuracy: position.coords.accuracy,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    locationButton.attr('disabled', 'disabled').text('Send location');
        
        locationButton.attr('disabled', false);
    }, function () {
        alert('Unable to fetch location.')
    });

});