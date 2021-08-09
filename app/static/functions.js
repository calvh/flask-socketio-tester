"use strict";

const generateRandomString = (length = 6) =>
  Math.random().toString(20).substr(2, length);

const getUsername = () => {
  return $inputUsername.value.trim();
};

const getRoom = () => {
  return $inputRoom.value.trim();
};

// trigger server to initiate join room
const joinRoom = (room) => {
  if (room) {
    socket.emit("join", { username: getUsername(), room });
    $currentRoom.textContent = room;
  }
};

// trigger server to initiate leave room
const leaveRoom = (room) => {
  if (room) {
    socket.emit("leave", { username: getUsername(), room });
    $currentRoom.textContent = "null";
  }
};
