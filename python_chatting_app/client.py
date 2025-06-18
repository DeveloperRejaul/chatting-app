import socketio
import asyncio
import sys

# Get the message from command-line arguments
message_to_send = " ".join(sys.argv[1:])  # join if multiple words


# Create an asynchronous Socket.IO client
sio = socketio.AsyncClient()

async def main():
    try:
        # Connect to the server
        await sio.connect('http://localhost:8000')

        print("✅ Connected to server")


        # Emit a message to the server
        if message_to_send:
            await sio.emit('message', message_to_send)
            print(f"📤 Sent message: {message_to_send}")


        # Wait for events
        await sio.wait()


    except Exception as e:
        print(f'⚠️ Exception: {e}')    



@sio.on('message')
async def on_message(data):
    print('📩 Received message:', data)

# Run the main coroutine
asyncio.run(main())