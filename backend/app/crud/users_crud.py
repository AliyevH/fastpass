from .base import BaseCrud
from sqlalchemy.orm import Session


class UserCrud(BaseCrud):
    __abstract__ = True

    @classmethod
    def get_user_by_id(cls, db: Session, user_id):
        return db.query(cls).filter(cls.id == user_id).first()

    @classmethod
    def get_users(cls, db: Session, skip: int = 0, limit: int = 100):
        return db.query(cls).offset(skip).limit(limit).all()

    @classmethod
    def get_user_by_email(cls, db: Session, email):
        return db.query(cls).filter(cls.email == email).first()


class GroupCrud(BaseCrud):
    __abstract__ = True

    @classmethod
    def get_group_by_id(cls, db: Session, group_id):
        return db.query(cls).filter(cls.id == group_id).first()

    @classmethod
    def get_groups(cls, db: Session, skip: int = 0, limit: int = 100):
        return db.query(cls).offset(skip).limit(limit).all()


class UsersGroupsCrud(BaseCrud):
    __abstract__ = True

    @classmethod
    def get_by_user_id(cls, db: Session, user_id):
        return db.query(cls).filter(cls.id == user_id).first()


    @classmethod
    def get_by_group_id(cls, db: Session, group_id):
        return db.query(cls).filter(cls.id == group_id).first()




