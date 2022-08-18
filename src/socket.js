module.exports = (io) => {
  let messages = [];
  let usersConnected = [];

  io.on('connection', (socket) => {
    io.emit('messages', messages);
    console.log('connection', socket.id);

    // socket.join("global chat")

    socket.on('userLogged', (userData) => {
      const user = {
        username: userData.username,
        userId: userData.uuid,
      };
      usersConnected.push(user);
    });

    //rooms

    socket.on('userLogOut', (userData) => {
      const filterUsers = usersConnected.filter(
        (us) => us.uuid !== userData.uuid
      );
      usersConnected = filterUsers;
    });

    socket.on('message', (messageData) => {
      messages.push(messageData);
      io.emit('messages', messages);
    });
    socket.on('disconnect', () => {
      usersConnected = usersConnected.filter((u) => u.id !== socket.id);
      io.emit('new user', usersConnected);
    });
  });
};
