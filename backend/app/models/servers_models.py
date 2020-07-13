from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, BINARY
from sqlalchemy.orm import relationship
from typing import TYPE_CHECKING
from app.crud.servers_crud import ServerCrud

if TYPE_CHECKING:
    from .users_model import User

class Server(ServerCrud):
    __tablename__ = "servers"

    id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    hostname = Column(String, index=True)
    ip = Column(String, index=True)
    login_user = Column(String)
    ciphertext = Column(BINARY)
    tag = Column(BINARY)
    nonce = Column(BINARY)

    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="servers")


# class Labels(ServerCrud):
#     __tablename__ = "labels"
#
#     id = Column(Integer, primary_key=True)
#     name = Column(String, index=True)
#     description = Column(String, index=True)
#
#     owner_id = Column(Integer, ForeignKey("users.id"))
#
#     owner = relationship("User", back_populates="labels")
#
#
# class ServerLabels(ServerCrud):
#     __tablename__ = "servergroup"
#
#     id = Column(Integer, primary_key=True)
#     owner_id = Column(Integer, ForeignKey("servers.id"))
#     label_id = Column(Integer, ForeignKey("labels.id"))
