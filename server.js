// Creating my server package 
const path = require ('path');
const http = require ('http');
// configuring socket.io 
const SocketIO = require ('socket.io');
const formatMessage = require ('./utils/messages')
const express = require('express');
const app = express();
const server = http.createServer(app);
//initializing  the var and passing server 
const io = SocketIO(server);
//setting up the static folder
app.use(express.static(path.join(__dirname,'public')));
//naming my bot 
const BotName = "Minion-Bot"
// run it when other client connects
io.on('connection', socket => {
    // welcome to the current user 
    socket.emit('message',formatMessage(BotName, 'Welcome to MinionCord'));
    // alert when another user connects-- this works for all users except the one is joining
    socket.broadcast.emit('message',formatMessage(BotName,  'A user has joined the chat'));
    // when  client disconnects
    socket.on('disconnect', () =>{
        //alert all users
        io.emit('message', formatMessage(BotName, 'A user has left the chat'));
    });
    // here to listen to for the chat-messages 
    socket.on('chatMessage', (msg) =>{
        io.emit('message',formatMessage('USER', msg));
        console.log(msg);
    });
});

const PORT=3000 || process.env.PORT;
server.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
