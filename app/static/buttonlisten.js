"use strict";

$btnJoinRoom.addEventListener("click", (event) => {
  event.preventDefault();
  // joinRoom(getRoom());
});

$btnLeaveRoom.addEventListener("click", (event) => {
  event.preventDefault();
  leaveRoom(getRoom());
});

$btnQueue.addEventListener("click", (event) => {
  event.preventDefault();
  socket.emit("queue");
});

$btnGetRooms.addEventListener("click", (event) => {
  event.preventDefault();
  const username = getUsername() ? getUsername() : "anonymous";
  socket.emit("get rooms", { username });
});

$btnSendGeneralChat.addEventListener("click", (event) => {
  event.preventDefault();

  const username = getUsername() ? getUsername() : "anonymous";
  const message = $inputGeneralChat.value.trim();

  if (message) {
    socket.emit("general chat", {
      username,
      message,
    });
  }
});

$btnSendRoomChat.addEventListener("click", (event) => {
  event.preventDefault();

  const username = getUsername() ? getUsername() : "anonymous";
  const room = getRoom();
  const message = $inputRoomChat.value.trim();

  if (room && message) {
    socket.emit("room chat", {
      username,
      message,
      room,
    });
  }
});
