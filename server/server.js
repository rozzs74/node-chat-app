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


    socket.on('createMessage', (message) => {
        console.log('Create message from terminal', message);

        // Broadcast event
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });

});

server.listen(port, () => {
    console.log(`Server is up on ${port}`);
});


