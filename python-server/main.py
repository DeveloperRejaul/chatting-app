from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from db import db
from modal import LoginPayload
import jwt
from secret import key
from sockets import sio_app

app = FastAPI()

# user db
users = db["user"]


# CORS setup
origins = [
    "http://localhost",
    "http://localhost:8081",
    "http://192.168.1.71",
    "http://192.168.1.71:8081",
    "http://192.168.1.71:5173",
    "http://192.168.68.113:5173",
    "http://localhost:44382",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows your specified origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)


@app.get("/")
async def root():
    return {"message": "Server is running"}

@app.post("/login")
async def root(body:LoginPayload):
    for x in users:
        if body.email == x["email"] and body.password == x["password"]:
             token = jwt.encode(x, key, algorithm="HS256")
             return {"message":"User login successful",**x, "token": token}
    raise HTTPException(status_code=401, detail="Unauthorized")

@app.get('/users')
async def getUsers():
    data = []
    for x in users:
        data.append({"id": x["id"], "name":x["name"], "email": x['email']})
    return data

# must setup the socketio app bottom of the app
app.mount("/",app=sio_app)
