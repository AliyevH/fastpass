from fastapi import APIRouter, Depends, Request
from app.schemas import users_schema
from app.crud.init_db import get_db
from app.models import users_model
from app.utils.hash_password import encrypt_password, verify_password
import jwt, datetime

from sqlalchemy.orm import Session

SECRET_KEY = "603EB60C-3AD0-46DB-92B8-2813689E3272"

router = APIRouter()


@router.post("/auth/registration", response_model=users_schema.UserRead)
async def create_user(user: users_schema.UserCreate, db: Session = Depends(get_db)):
    user = user.dict()
    user["hashed_password"] = encrypt_password(user.pop("password"))
    user_obj = users_model.User(**user)
    user_obj = user_obj.save_db(db)
    return user_obj


@router.post("/auth/login", response_model=users_schema.UserLoginResponse)
async def login(auth: users_schema.UserLogin, db: Session = Depends(get_db)):
    user = users_model.User.get_user_by_email(db, auth.email)
    user.token = ""
    if verify_password(auth.password, user.hashed_password):
        token = jwt.encode(
            {
                "user_id": user.id, "user_email": user.email,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=5)
            },
            SECRET_KEY,
            algorithm="HS256"
        )
        setattr(user, "token", token.decode("utf-8"))
    return user

