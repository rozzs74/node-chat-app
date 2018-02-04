var socket = io();
socket.on('connect', function () {
    console.log('Connecteed to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
    console.log('Message from the server', message);
});
