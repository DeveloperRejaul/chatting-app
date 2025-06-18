import socketio
from db import db
import jwt
from secret import key
from db import db

users = db["user"]

# create a Socket.IO server
sio_server = socketio.AsyncServer(
    async_mode='asgi',
    cors_allowed_origins="*",
)

sio_app = socketio.ASGIApp(
    socketio_server=sio_server,
    socketio_path='/socket.io',
)



# -----------------------------
# EVENT: Client connected
# -----------------------------
@sio_server.event
async def connect(sid, environ, auth):
    if auth and "token" in auth:
        try:
            token = auth["token"]
            payload = jwt.decode(token, key, algorithms=["HS256"]) 

            # Optional user check
            for x in users:
                if x["email"] == payload["email"]:
                    x["socketId"] = sid
                    print('Client connected:', sid)
                    return True
            return await sio_server.disconnect(sid)

        except jwt.ExpiredSignatureError:
            return await sio_server.disconnect(sid)

        except jwt.DecodeError:
            return await sio_server.disconnect(sid)
    else:
        return await sio_server.disconnect(sid)

# -----------------------------
# EVENT: Client disconnected
# -----------------------------
@sio_server.event
async def disconnect(sid):
    print('Client disconnected:', sid)


# -----------------------------
# For all connected user
# -----------------------------
@sio_server.event
async def message(sid, data):
    print(data)
    await sio_server.emit("message", data)



# -----------------------------
# For specific user
# -----------------------------
@sio_server.event
async def send(sid, data):
    id = data.get('id')
    message = data.get('message')
    senderId = data.get('senderId')
    files = data.get('files')
    
    for x in users:
       if x and "socketId" in x:
           if id == x['id']:
            socketId = x["socketId"]
            await sio_server.emit("send", {"message": message, "id":id, "senderId": senderId, "files":files}, to=socketId)


# -----------------------------
# Create/Add User to Room
# -----------------------------
@sio_server.event
async def join_room(sid, data):
    room = data.get('room')
    if room:
        await sio_server.enter_room(sid, room)
        await sio_server.emit("info", f"Joined room {room}", to=sid)
        print(f"{sid} joined room {room}")


# -----------------------------
# Remove User from Room
# -----------------------------
@sio_server.event
async def leave_room(sid, data):
    room = data.get('room')
    if room:
        await sio_server.leave_room(sid, room)
        await sio_server.emit("info", f"Left room {room}", to=sid)
        print(f"{sid} left room {room}")


# -----------------------------
# Send Message to Room
# -----------------------------
@sio_server.event
async def message_to_room(sid, data):
    room = data.get('room')
    message = data.get('message')
    if room and message:
        await sio_server.emit("message", message, room=room)
        print(f"Message to room {room}: {message}")


# -----------------------------
# "Delete" a Room (custom logic)
# -----------------------------
# Note: Socket.IO doesn't natively support deleting rooms.
# Instead, you remove all users from the room and stop using it.
room_members = {}

@sio_server.event
async def delete_room(sid, data):
    room = data.get('room')
    if not room:
        return

    # Leave all members from the room (if tracked manually)
    if room in room_members:
        for member_sid in room_members[room]:
            await sio_server.leave_room(member_sid, room)
            await sio_server.emit("info", f"Room {room} deleted", to=member_sid)
        del room_members[room]
    print(f"Room {room} deleted")