"use strict";

socket.on("connect", () => {
  $status.textContent = "connected";
  $socketId.textContent = socket.id;
  const username = getUsername() ? getUsername() : "anonymous";
  socket.emit("connected", { username });
});

socket.on("disconnect", () => {
  $status.textContent = "disconnected";
  $socketId.textContent = "null";
  $currentRoom.textContent = "null";
});

// messages sent by unnamed events
socket.on("message", (data) => {
  const node = document.createElement("li");
  node.textContent = `${data.username}: ${data.message}`;
  node.classList.add("chat");
  $generalChatMessages.appendChild(node);
});

socket.on("room chat", (data) => {
  const node = document.createElement("li");
  node.textContent = `${data.username}: ${data.message}`;
  node.classList.add("chat");
  $roomChatMessages.appendChild(node);
});

socket.on("joined room", (data) => {
  console.log(`joined room ${data.room}`);
});

socket.on("left room", (data) => {
  console.log(`left room ${data.room}`);
});
