"use strict";

socket.on("connect", () => {
  $status.textContent = "CONNECTED";
});

socket.on("status change", (data) => {
  $status.textContent = data.status;
});

socket.on("disconnect", () => {
  $status.textContent = "disconnected";
  $currentRoom.textContent = "null";
  $opponent.textContent = "null";
  room = null;
  opponent = null;
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

socket.on("general notification", (notification) => {
  const node = document.createElement("li");
  node.textContent = notification;
  node.classList.add("notification");
  $generalChatMessages.appendChild(node);
});

socket.on("room notification", (notification) => {
  const node = document.createElement("li");
  node.textContent = notification;
  node.classList.add("notification");
  $roomChatMessages.appendChild(node);
});

socket.on("user notification", (data) => {
  console.log(data);
});

socket.on("joined room", (data) => {
  room = data.room;
  opponent = data.opponent;
  $currentRoom.textContent = room;
  $opponent.textContent = opponent;
});
