from pydantic import BaseModel

class LoginPayload(BaseModel):
    email: str
    password: str

