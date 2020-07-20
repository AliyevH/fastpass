from fastapi import APIRouter, Depends, Header
from app.schemas import labels_schema
from app.crud.init_db import get_db
from app.utils.jwt_decode import jwt_token
from starlette.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List, Optional

from app.models import labels_model

router = APIRouter()


@router.get("/labels", response_model=List[labels_schema.LabelRead])
async def get_labels(
        Authorization: Optional[str] = Header(None),
        skip: int = 0,
        limit: int = 100,
        db: Session = Depends(get_db)
):
    user_token = jwt_token(Authorization)
    if isinstance(user_token, dict):
        return labels_model.Label.get_labels(db, skip, limit)

    return JSONResponse(content={"msg": "Access denied"}, status_code=403)


@router.get("/labels/{label_id}", response_model=labels_schema.LabelRead)
def get_label_by_name(
        label_id: int,
        Authorization: Optional[str] = Header(None),
        db: Session = Depends(get_db)
):
    user_token = jwt_token(Authorization)
    if isinstance(user_token, dict):
        label = labels_model.Label.get_label_by_id(db, label_id)
        if label and user_token.get("user_id") == label.owner_id:
            return label
    return JSONResponse(content={"msg": "Access denied"}, status_code=403)


# @router.post("/labels", response_model=labels_schema.LabelRead)
# def create_label(
#         label: labels_schema.LabelCreate,
#         Authorization: Optional[str] = Header(None),
#         db: Session = Depends(get_db)
# ):
#     user_token = jwt_token(Authorization)
#     if isinstance(user_token, dict):
#         label_obj = labels_model.Label(**label.dict())
#         label_obj.owner_id = user_token.get("user_id")
#         label_obj.save_db(db)
#         return label_obj
#
#     return JSONResponse(content={"msg": "Access denied"}, status_code=403)