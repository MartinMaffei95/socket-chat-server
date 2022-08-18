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
    origin: '*', //TEMP : Change for my domain
    methods: ['GET', 'POST'],
  },
});
require('./socket')(io);

app.get('/', function (req, res) {
  res.send(200, 'ok');
});
server.listen(app.get('port'), () => {
  console.log('App run in port:' + app.get('port'));
});
