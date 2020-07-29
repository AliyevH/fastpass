from .base import BaseCrud
from sqlalchemy.orm import Session
from app.utils.aes_enc_dec import decrypt
import uuid


class ServerCrud(BaseCrud):
    __abstract__ = True

    @classmethod
    def get_server_by_id(cls, db: Session, server_id=None, secret_key=None):
        try:
            server_id = uuid.UUID(server_id).hex
            server = db.query(cls).filter(cls.id == server_id).first()
        except Exception as err:
            print(err)
            return False

        if secret_key and server_id:
            try:
                server_password = decrypt(server.ciphertext, secret_key)
                server.password = server_password
            except Exception as err:
                print(err)
                return False
        return server


    @classmethod
    def get_servers(cls, db: Session, skip: int = 0, limit: int = 100):
        return db.query(cls).offset(skip).limit(limit).all()
