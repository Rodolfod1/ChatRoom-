// Creating my server package 
const path = require ('path');
const http = require ('http');
// configuring socket.io 
const SocketIO = require ('socket.io');
const formatMessage = require ('./utils/messages')
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require ('./utils/users')
const express = require('express');
const app = express();
const PORT=process.env.PORT || 3000 ;
const server = http.createServer(app);
//initializing  the var and passing server 
const io = SocketIO(server);
//setting up the static folder
app.use(express.static(path.join(__dirname,'public')));
//naming my bot 
const BotName = "Minion-Bot"
// run it when other client connects
io.on('connection', socket => {
    socket.on('joinRoom',({username, room}) =>{
        // setting the user for room 
        const user=userJoin(socket.id, username, room);
        socket.join(user.room);
         // welcome to the current user 
        socket.emit('message',formatMessage(BotName, 'Welcome to MinionCord'));
        // alert when another user connects-- this works for all users except the one is joining
        socket.broadcast.to(user.room).emit('message',formatMessage(BotName,  `${user.username} has joined the chat`));
            //sending users and room info 
    io.to(user.room).emit('roomUsers',{
        room: user.room,
        users: getRoomUsers(user.room)
        });
    });
    // here to listen to for the chat-messages 
    socket.on('chatMessage', (msg) =>{
        //getting the current user
        const user= getCurrentUser(socket.id);
        // added . to () since we are using the rooms
        io.to(user.room).emit('message',formatMessage(user.username, msg));
        
    });
    // when  client disconnects
    socket.on('disconnect', () =>{
        //getting the unique user that is leaving
        const user = userLeave(socket.id);
        if (user){
        //alert all users
        io.to(user.room).emit('message', formatMessage(BotName, `${user.username} has left the chat`));
        };
        //sending users and room info 
    io.to(user.room).emit('roomUsers',{
        room: user.room,
        users: getRoomUsers(user.room)
        });
    });
    });
// displaying the port 
server.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
