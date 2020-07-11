from typing import List, Optional
from pydantic import BaseModel, EmailStr
from .servers_schema import ServerRead


class UserBase(BaseModel):
    email: EmailStr

    class Config:
        orm_mode = True


class UserCreate(UserBase):
    password: str


class UserRead(UserBase):
    id: int


class Users(UserRead):
    users: List[UserRead] = []


class UserServers(UserRead):
    servers: List[ServerRead] = []
    pass


class UserLogin(UserBase):
    password: str


class UserLoginResponse(UserBase):
    token: str
