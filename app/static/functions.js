"use strict";

const generateRandomString = (length = 6) =>
  Math.random().toString(20).substr(2, length);

// trigger server to initiate leave room
const leaveRoom = (room) => {
  if (room) {
    socket.emit("leave", { room });

    $currentRoom.textContent = "null";
    $opponent.textContent = "null";

    room = null;
    opponent = null;
  }
};
