"use strict";

const $socketId = document.querySelector("#socket-id");

const $inputUsername = document.querySelector("#input-username");
const $inputRoom = document.querySelector("#input-room");

const $status = document.querySelector("#status");

const $currentRoom = document.querySelector("#current-room");
const $btnJoinRoom = document.querySelector("#btn-join-room");
const $btnLeaveRoom = document.querySelector("#btn-leave-room");
const $btnQueue = document.querySelector("#btn-queue");
const $btnGetRooms = document.querySelector("#btn-get-rooms");

const $serverMessages = document.querySelector("#server-messages");

const $generalChatMessages = document.querySelector("#general-chat-messages");
const $inputGeneralChat = document.querySelector("#input-general-chat");
const $btnSendGeneralChat = document.querySelector("#btn-send-general-chat");

const $roomChatMessages = document.querySelector("#room-chat-messages");
const $inputRoomChat = document.querySelector("#input-room-chat");
const $btnSendRoomChat = document.querySelector("#btn-send-room-chat");

let room = null;
let opponent = null;

const socket = io();
