# from .base import BaseCrud
# from sqlalchemy.orm import Session
# from app.utils.aes_enc_dec import decrypt
#
#
# class Label(BaseCrud):
#     __abstract__ = True
#
#     @classmethod
#     def get_label_by_bame(cls, db: Session, label_name):
#         return db.query(cls).filter(cls.name == label_name).first()
#
#     @classmethod
#     def get_labels(cls, db: Session, skip: int = 0, limit: int = 100):
#         return db.query(cls).offset(skip).limit(limit).all()
#
