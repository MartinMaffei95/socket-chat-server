const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const app = express();
const http = require('http');

app.set('port', 3005);
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});
require('./socket')(io);

server.listen(app.get('port'), () => {
  console.log('App run in port:' + app.get('port'));
});
