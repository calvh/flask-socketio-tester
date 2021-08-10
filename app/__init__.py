import os
import uuid
from collections import deque

from flask import Flask, render_template, request, session
from flask_socketio import SocketIO, send, emit, rooms, join_room, leave_room

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("base.html")


SOCKETIO_LOGGER = False
SOCKETIO_ENGINEIO_LOGGER = False
socketio = SocketIO(
    app, logger=SOCKETIO_LOGGER, engineio_logger=SOCKETIO_ENGINEIO_LOGGER
)

# keep track of connected clients for reference in queue
clients = set()


queue = deque()
# use queue to push clients into rooms
# add to queue
# trigger dequeuing
@socketio.on("queue")
def handle_queue():

    sid = request.sid

    # prevent duplicate queuing
    if sid not in queue:
        queue.append(sid)

    players = set()

    while len(players) < 2:
        try:
            players.add(queue.popleft())
        except IndexError:
            break

    # failed to find match for last player, requeue
    if len(players) < 2:
        last = players.pop()
        queue.append(last)
        return emit("user notification", "Failed to find a match", to=last)

    # match found
    player1 = players.pop()
    player2 = players.pop()

    room_id = uuid.uuid4().hex

    # check for collision with existing socket ids
    # TODO investigate if this is necessary
    while room_id in clients:
        room_id = uuid.uuid4().hex

    join_room(room_id, sid=player1)
    join_room(room_id, sid=player2)
    emit("user notification", f"Joined room {room_id}", to=player1)
    emit("user notification", f"Joined room {room_id}", to=player2)
    emit("joined room", {"room": room_id, "opponent": player2}, to=player1)
    emit("joined room", {"room": room_id, "opponent": player1}, to=player2)
    emit("room notification", f"{player1} vs {player2}!", to=room_id)


@socketio.on("connected")
def handle_connected(data):

    data["message"] = "ONLINE"

    # unnamed events will be handled by "messsage" on client-side
    send(data, broadcast=True)

    # could use request.sid or request.sid
    sid = request.sid
    clients.add(sid)

    # TODO for registered users can use username from session
    # ensure login method writes username to session cookie


@socketio.on("general chat")
def handle_general_chat(data):
    send(data, broadcast=True)


@socketio.on("room chat")
def handle_room_chat(data):
    # send named event so frontend can handle separately from general messages
    # check if client is in room
    if data["room"] in rooms():
        emit("room chat", data, to=data["room"])


@socketio.on("get rooms")
def handle_get_rooms(data):
    emit("get rooms", {"rooms": rooms()})


@socketio.on("disconnect")
def handle_disconnect():
    print(f"{request.sid} disconnected")
    clients.remove(request.sid)


@socketio.on("join")
def on_join(data):

    sid = request.sid
    room = data["room"]

    join_room(room)

    # notify user of successful join
    emit("user notification", f"Joined {room}")

    # notify room that a new user has joined
    emit("room notification", f"{sid} JOINED", to=room)


@socketio.on("leave")
def on_leave(data):

    sid = request.sid
    room = data["room"]
    leave_room(room)

    # notify user of successful exit
    emit("user notification", f"Left {room}")

    # notify room that a user has left
    emit("room notification", f"{sid} LEFT", to=room)
