import os
from collections import deque

from flask import Flask, render_template, request
from flask_socketio import SocketIO, send, emit, join_room, leave_room

app = Flask(__name__)
app.config["ENV"] = "development"
app.config["SECRET_KEY"] = "secret"


@app.route("/")
def index():
    return render_template("base.html")


SOCKETIO_LOGGER = False
SOCKETIO_ENGINEIO_LOGGER = False
socketio = SocketIO(
    app, logger=SOCKETIO_LOGGER, engineio_logger=SOCKETIO_ENGINEIO_LOGGER
)

queue = deque()
# use queue to push clients into rooms
# add to queue
# trigger dequeuing
@socketio.on("queue")
def handle_queue(username):
    # even -> go to 0
    # odd -> go to 1
    while len(queue) > 1:
        next_player = queue.popleft()
        # TODO
        pass


@socketio.on("connected")
def handle_connected(data):
    data["message"] = "ONLINE";
    send(data, broadcast=True)


@socketio.on("general chat")
def handle_general_chat(data):
    send(data, broadcast=True)


@socketio.on("room chat")
def handle_room_chat(data):
    # send named event so frontend can handle separately from general messages
    emit("room chat", data, to=data["room"])


@socketio.on("join")
def on_join(data):
    room = data["room"]
    # socket id automatically obtained from request context
    join_room(room)

    # send() used for unnamed events
    # unnamed events will be handled by "messsage" on client-side
    data["message"] = "JOINED"
    emit("room chat", data, to=room)


@socketio.on("leave")
def on_leave(data):
    room = data["room"]
    leave_room(room)
    data["message"] = "LEFT"
    emit("room chat", data, to=room)
