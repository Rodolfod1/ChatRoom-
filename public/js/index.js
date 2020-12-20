const chatForm = document.querySelector("#chat-form");
// const chatMessages = document.querySelector(".chat-messages");
// const roomName = document.querySelector("#room-name");
// const userList = document.querySelector("#users");

// Get username and room from URL
// const { username, room } = Qs.parse(location.search, {
//   ignoreQueryPrefix: true
// });

const socket = io();

// // Join chatroom
// socket.emit('joinRoom', { username, room });

// // Get room and users
// socket.on('roomUsers', ({ room, users }) => {
//   outputRoomName(room);
//   outputUsers(users);
// });

// Message from server
socket.on('message', message => {
  console.log(message);
   outputMessage(message);

  // // Scroll down
  // chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', e => {
  e.preventDefault();

//   // Get message text
  const msg = e.target.elements.msg.value;
 
//   msg = msg.trim();
  
//   if (!msg){
//     return false;
//  }

  // Emitting  message to server
  socket.emit('chatMessage', msg);

//   // Clear input
//   e.target.elements.msg.value = '';
//   e.target.elements.msg.focus();
 });

// // Output message to DOM
function outputMessage(message) {
  console.log("mensaje: "+message);
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML= `<p class="meta">Rodo<span>10:20pm</span></p>
  <p class="text"> ${message} </p>`; 
  document.querySelector('.chat-messages').appendChild(div);


  // const p = document.createElement('p');


  // p.classList.add('meta');
  // // p.innerText = message.username;
  //  p.innerHTML += `<span>${message.time}</span>`;

  // div.innerHTML 


  // div.appendChild(p);
  // const para = document.createElement('p');
  // para.classList.add('text');
  // para.innerText = message.text;
  // div.appendChild(para);
  // document.querySelector('.chat-messages').appendChild(div);
}

// // Add room name to DOM
// function outputRoomName(room) {
//   roomName.innerText = room;
// }

// // Add users to DOM
// function outputUsers(users) {
//   userList.innerHTML = '';
//   users.forEach(user=>{
//     const li = document.createElement('li');
//     li.innerText = user.username;
//     userList.appendChild(li);
//   });
//  }