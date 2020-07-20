from fastapi import APIRouter, Depends, Header
from app.schemas import users_schema
from app.crud.init_db import get_db
from app.models import users_model
from app.utils.jwt_decode import jwt_token
from starlette.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List, Optional


router = APIRouter()


@router.get("/users", response_model=List[users_schema.Users])
async def get_users(
        Authorization: Optional[str] = Header(None),
        skip: int = 0,
        limit: int = 100,
        db: Session = Depends(get_db)
):
    user_token = jwt_token(Authorization)
    if isinstance(user_token, dict) and user_token.get("user_email") == "admin@fastpass.com":
        return users_model.User.get_users(db, skip, limit)

    return JSONResponse(content={"msg": "Access denied"}, status_code=403)


@router.get("/user", response_model=users_schema.UserRead)
async def read_users(
        Authorization: Optional[str] = Header(None),
        db: Session = Depends(get_db)
):
    user_token = jwt_token(Authorization)
    if isinstance(user_token, dict):
        return users_model.User.get_user_by_id(db, user_token.get("user_id"))


@router.delete("/user")
async def delete_user(
        Authorization: Optional[str] = Header(None),
        db: Session = Depends(get_db)
):
    user_token = jwt_token(Authorization)
    if isinstance(user_token, dict):
        return users_model.User.delete(db)


# @router.get("/user/email", response_model=users_schema.UserRead)
# async def get_user_by_email(
#         Authorization: Optional[str] = Header(None),
#         db: Session = Depends(get_db)
# ):
#     user_token = jwt_token(Authorization)
#     if isinstance(user_token, dict):
#         return users_model.User.get_user_by_email(db, user_token.get("user_email"))
