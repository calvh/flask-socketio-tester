"use strict";

$btnLeaveRoom.addEventListener("click", (event) => {
  event.preventDefault();
  leaveRoom(room);
});

$btnQueue.addEventListener("click", (event) => {
  event.preventDefault();
  socket.emit("queue");
});

$btnSendGeneralChat.addEventListener("click", (event) => {
  event.preventDefault();

  const message = $inputGeneralChat.value.trim();

  if (message) {
    socket.emit("general chat", {
      message,
    });
  }
});

$btnSendRoomChat.addEventListener("click", (event) => {
  event.preventDefault();

  const message = $inputRoomChat.value.trim();

  if (room && message) {
    socket.emit("room chat", {
      message,
      room,
    });
  }
});
