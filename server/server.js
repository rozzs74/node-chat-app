const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require("express");

const { generateMessage } = require('./utils/message');
const publicPath = path.join(__dirname, '/../public');
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

// Tell express to use the public path
app.use(express.static(publicPath))

// register event listener
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

    socket.on('createMessage', (message, callback) => {
        console.log('CreateMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback('This is from the server');
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});


