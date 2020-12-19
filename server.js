// Creating my server package 
const path = require ('path');
const http = require ('http');
// configuring socket.io 
const SocketIO = require ('socket.io');
const express = require('express');
const app = express();
const server = http.createServer(app);
//initializing  the var and passing server 
const io = SocketIO(server);
//setting up the static folder
app.use(express.static(path.join(__dirname,'public')));
// run it when other client connects
io.on('connection', socket => {
    console.log("New socket connection made..");
})
const PORT=8080 || process.env.PORT;
server.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
