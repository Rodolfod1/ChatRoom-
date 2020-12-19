// Creating my server package 
const path = require ('path');
const http = require ('http');

const express = require('express');
const app = express();
const server = http.createServer(app);

//setting up the static folder
app.use(express.static(path.join(__dirname,'public')));

const PORT=8080 || process.env.PORT;
server.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
