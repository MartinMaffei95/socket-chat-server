const socket = io();

const username = document.getElementById('username');
const write_message = document.getElementById('write_message');
const allMessages = document.getElementById('allMessages');

// write_message.addEventListener('keyup', (e) => {
//   if (e.code == 'Enter') {
//     if (username.value != '' && write_message.value != '') {
//       socket.emit('message', {
//         username: username.value,
//         message: write_message.value,
//       });
//       write_message.value = '';
//     } else {
//       console.log('Los campos no pueden estar vacios');
//     }
//   }
// });

send_messageButton.addEventListener('click', (e) => {
  e.preventDefault();
  const date = Date.now();
  if (username.value != '' && write_message.value != '') {
    socket.emit('message', {
      username: username.value,
      message: write_message.value,
      sendDate: date,
    });
    write_message.value = '';
  } else {
    console.log('Los campos no pueden estar vacios');
  }
});

socket.on('messages', (messages) => {
  let content = '';
  for (let i = 0; i < messages.length; i++) {
    const messageDate = new Date(messages[i].sendDate);
    if (messages[i].username === username.value) {
      content += `
        <div class="message me">
          <span class="message_user">${messages[i].username}:</span>
          <p class="message_message">${messages[i].message}</p>
          <span class="message_date">${messageDate.getHours()}:${messageDate.getMinutes()}</span>
        </div>
    `;
    } else {
      content += `
        <div class="message">
          <span class="message_user">${messages[i].username}:</span>
          <p class="message_message">${messages[i].message}</p>
          <span class="message_date">${messageDate.getHours()}:${messageDate.getMinutes()}</span>
        </div>
    `;
    }
  }
  allMessages.innerHTML = content;
});
