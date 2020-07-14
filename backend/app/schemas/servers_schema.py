from typing import List, Optional
from pydantic import BaseModel, EmailStr

class ServerBase(BaseModel):
    name: str
    hostname: str
    ip: str
    login_user: str
    owner_id: int
    label_id: int

    class Config:
        orm_mode = True


class ServerCreate(ServerBase):
    password: str
    secret_key: str


class ServerRead(ServerBase):
    id: int
    password: Optional[str]



class Servers(ServerRead):
    servers: List[ServerRead] = []
