from typing import List
from pydantic import BaseModel
from .servers_schema import ServerRead
from .users_schema import UserRead


class LabelBase(BaseModel):
    name: str
    color: str
    description: str

    class Config:
        orm_mode = True


class LabelCreate(LabelBase):
    pass


class LabelRead(LabelBase):
    owner: UserRead
    server: List[ServerRead] = []