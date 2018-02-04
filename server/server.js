const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require("express");

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');
const publicPath = path.join(__dirname, '/../public');
const app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
// Tell express to use the public path
app.use(express.static(publicPath))

// register event listener
io.on('connection', (socket) => {
    console.log('New user connected');

    /* JOIN */
    socket.on('join', (params, callback) => {

        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
        }

        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
        callback();
    });

    /* CREATE MESSAGE */
    socket.on('createMessage', (message, callback) => {
        console.log('CreateMessage', message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    /* CREATE LOCATION MESSAGE */
    socket.on('createLocationMessage', (coordinates) => {
        console.log('Coordinates from server', coordinates);
        io.emit('newLocationMessage', generateLocationMessage('User', coordinates.latitude, coordinates.longitude));
    });

    /* DISCONNECT RUNNING WEBSOCKET */
    socket.on('disconnect', () => {
        console.log('User was disconnected');
        var user = users.removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(users.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
        }

    });

});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});


