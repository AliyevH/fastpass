from .base import BaseCrud
from sqlalchemy.orm import Session


class LabelCrud(BaseCrud):
    __abstract__ = True

    @classmethod
    def get_label_by_name(cls, db: Session, label_name):
        return db.query(cls).filter(cls.name == label_name).first()


    @classmethod
    def get_labels(cls, db: Session, skip: int = 0, limit: int = 100):
        return db.query(cls).offset(skip).limit(limit).all()
