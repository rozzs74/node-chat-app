const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require("express");

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

    // socket.emit('newEmail', {
    //     from: 'royce@gmail.com',
    //     text: 'Hello world!',
    //     createAt: 123
    // });

    // socket.on('createEmail', (newEmail) => {
    //     console.log('Create email', newEmail);
    // });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

    socket.on('createMessage', (message) => {
        console.log('Create message from terminal', message);
    });

    socket.emit('newMessage', {
        from: 'server',
        text: 'A message from server',
        createdAt: 123456
    });


});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});


