from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import Column
import uuid

from app.crud.init_db import Base
from app.crud.init_db import get_db


class BaseCrud(Base):
    __abstract__ = True

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, unique=True, nullable=False)

    def save_db(self, db):
        try:
            db.add(self)
            db.commit()
            return self
        except Exception as err:
            print(err)

    def update(self, **kwargs):
        for k, v in kwargs.items():
            setattr(self, k, v)
        return self.save_db()

    def delete(self, db_session):
        try:
            db_session.delete(self)
            db_session.commit()
            return True
        except Exception as err:
            print(err)
            return False
