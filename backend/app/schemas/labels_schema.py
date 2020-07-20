from typing import List
from pydantic import BaseModel
from .servers_schema import ServerRead
from typing import TYPE_CHECKING
import uuid

if TYPE_CHECKING:
    from .users_schema import UserRead


class LabelBase(BaseModel):
    name: str
    color: str
    description: str

    class Config:
        orm_mode = True


class LabelCreate(LabelBase):
    pass


class LabelRead(BaseModel):
    name: str
    id: uuid.UUID
    servers: List[ServerRead] = []

    class Config:
        orm_mode = True


class LabelID(BaseModel):
    label_id: str


