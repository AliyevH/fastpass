from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from typing import TYPE_CHECKING
from app.crud.labels_crud import LabelCrud

if TYPE_CHECKING:
    from .users_model import User





class Label(LabelCrud):
    __tablename__ = "labels"

    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    color = Column(String)
    description = Column(String, index=True)

    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="labels")
    servers = relationship("Server", back_populates="label")

    def __repr__(self):
        return f"Name: {self.name}, \nOwner: {self.owner}, \nServers: {self.servers}"
