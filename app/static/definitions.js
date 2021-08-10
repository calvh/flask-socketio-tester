"use strict";

const $socketId = document.querySelector("#socket-id");

const $status = document.querySelector("#status");

const $currentRoom = document.querySelector("#current-room");
const $opponent = document.querySelector("#opponent");
const $btnLeaveRoom = document.querySelector("#btn-leave-room");
const $btnQueue = document.querySelector("#btn-queue");

const $generalChatMessages = document.querySelector("#general-chat-messages");
const $inputGeneralChat = document.querySelector("#input-general-chat");
const $btnSendGeneralChat = document.querySelector("#btn-send-general-chat");

const $roomChatMessages = document.querySelector("#room-chat-messages");
const $inputRoomChat = document.querySelector("#input-room-chat");
const $btnSendRoomChat = document.querySelector("#btn-send-room-chat");

let room = null;
let opponent = null;

const socket = io();
