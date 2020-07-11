from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from typing import TYPE_CHECKING
from app.crud.users_crud import UserCrud, GroupCrud, UsersGroupsCrud
from datetime import datetime

if TYPE_CHECKING:
    from .servers_models import Server
    

class User(UserCrud):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False)

    created_on = Column(DateTime(), default=datetime.now)
    updated_on = Column(DateTime(), default=datetime.now, onupdate=datetime.now)

    servers = relationship("Server", back_populates="owner")

    def __repr__(self):
        return f"{self.email}"


# class Group(GroupCrud):
#     __tablename__ = "groups"
#
#     id = Column(Integer, primary_key=True, index=True)
#     group_name = Column(String, unique=True, index=True)
#
#
# class UsersGroups(UsersGroupsCrud):
#     __tablename__ = "usersgroups"
#
#     id = Column(Integer, primary_key=True, index=True)
#     user_id = Column(Integer, ForeignKey("users.id"))
#     group_id = Column(Integer, ForeignKey("groups.id"))

