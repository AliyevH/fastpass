from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, BINARY, LargeBinary
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID

from typing import TYPE_CHECKING
from app.crud.servers_crud import ServerCrud

if TYPE_CHECKING:
    from .users_model import User
    from .labels_model import Label


class Server(ServerCrud):
    __tablename__ = "servers"

    # id = Column(Integer, primary_key=True)
    name = Column(String, index=True)
    hostname = Column(String, index=True)
    ip = Column(String, index=True)
    login_user = Column(String)
    ciphertext = Column(LargeBinary)
    tag = Column(LargeBinary)
    nonce = Column(LargeBinary)

    owner_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    label_id = Column(UUID(as_uuid=True), ForeignKey("labels.id"))

    owner = relationship("User", back_populates="servers")
    label = relationship("Label", back_populates="servers")

    def __repr__(self):
        return f"\n\t{self.name}, {self.hostname}, {self.ip}"