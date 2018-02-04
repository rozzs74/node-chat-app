var socket = io();

function scrollToBottom() {
    // Selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    console.log('Connecteed to server');

    var params = $.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    $('#messages').append(html);
    scrollToBottom();
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function (users) {
    console.log('Users List', users);
    var ol = $('<ol></o>')
    users.forEach(function(user) {
        ol.append($('<li></li>').text(user));
    });
    $('#users').html(ol);
});

socket.on('newLocationMessage', function (message) {
    console.log('New location message', message);
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    });
    $('#messages').append(html);
    scrollToBottom();
});



$('#message-form').on('submit', function (e) {
    e.preventDefault();
    var messageTextBox = $('[name=message]');

    if (!messageTextBox.val()) {
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