const express = require('express');
const socketio = require('socket.io');
const path = require('path');
const app = express();
const http = require('http');

app.set('port', process.env.PORT || 5000);
app.use(express.static(path.join(__dirname, 'public')));

const server = http.createServer(app);
const io = socketio(server);
require('./socket')(io);
app.use(cors());

server.listen(app.get('port'), () => {
  console.log('App run in port:' + app.get('port'));
});
