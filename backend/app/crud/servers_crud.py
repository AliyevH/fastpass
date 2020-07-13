from .base import BaseCrud
from sqlalchemy.orm import Session
from app.utils.aes_enc_dec import decrypt


class ServerCrud(BaseCrud):
    __abstract__ = True

    @classmethod
    def get_server_by_id(cls, db: Session, id, secret_key=None):
        server = db.query(cls).filter(cls.id == id).first()
        if not server:
            return False
        if secret_key is None:
            return server

        server_password = decrypt(server.ciphertext, server.tag, server.nonce, (secret_key*2).encode())
        server.password = server_password
        return server

    @classmethod
    def get_servers(cls, db: Session, skip: int = 0, limit: int = 100):
        return db.query(cls).offset(skip).limit(limit).all()

