from fastapi import APIRouter, Depends, Request, Body
from app.schemas import users_schema
from app.crud.init_db import get_db
from app.models import users_model
from app.utils.hash_password import encrypt_password, verify_password
from app.utils.jwt_decode import verify_token
import jwt
import datetime
from starlette.responses import JSONResponse

from sqlalchemy.orm import Session

# Secret key use for jwt encryption and decryption
SECRET_KEY = "603EB60C-3AD0-46DB-92B8-2813689E3272"

router = APIRouter()


@router.post("/auth/registration", response_model=users_schema.UserRead)
async def create_user(user: users_schema.UserCreate, db: Session = Depends(get_db)):
    """
    :param user: first_name, last_name, email and password required
    :param db: get_db function return db Session
    :return: user object
    """
    user = user.dict()
    user["hashed_password"] = encrypt_password(user.pop("password"))
    user_obj = users_model.User(**user)
    user_obj = user_obj.save_db(db)
    return user_obj


@router.post("/auth/login", response_model=users_schema.UserLoginResponse)
async def login(
        auth: users_schema.UserLogin,
        db: Session = Depends(get_db)
):
    """
    :param auth: email and password required
    :param db: get_db function return db Session
    :return: user object with jwt token
    """
    user = users_model.User.get_user_by_email(db, auth.email)
    if user:
        user.token = ""
    else:
        return JSONResponse(content={"msg": "Username or password is incorrect"}, status_code=403)

    if verify_password(auth.password, user.hashed_password):
        token = jwt.encode(
            {
                "user_id": str(user.id), "user_email": user.email,
                'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=5)
            },
            SECRET_KEY,
            algorithm="HS256"
        )
        setattr(user, "token", token.decode("utf-8"))
    return user


@router.post("/auth/verify_token")
async def token_verification(
        token: str = Body(default=None, embed=True),
        db: Session = Depends(get_db)
):
    """
    :param token: token is required
    :param db: get_db function return db Session
    :return: Boolean
    """
    return True if verify_token(token) else False



