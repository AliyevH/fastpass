from fastapi import APIRouter, Depends, Header, Body
from app.schemas import labels_schema
from app.crud.init_db import get_db
from app.utils.jwt_decode import jwt_token
from starlette.responses import JSONResponse
from sqlalchemy.orm import Session
from typing import List, Optional
import uuid

from app.models import labels_model

router = APIRouter()

# Get all labels
@router.get("/labels", response_model=List[labels_schema.LabelRead])
async def get_labels(
        Authorization: Optional[str] = Header(None),
        skip: int = 0,
        limit: int = 100,
        db: Session = Depends(get_db)
):
    """
    :param Authorization: JWT Token required for Authorization
    :param skip: Default 0
    :param limit: Default 100
    :param db: get_db function returns db Session
    :return: all labels or Access Denied JSONResponse
    """
    user_token = jwt_token(Authorization)
    if isinstance(user_token, dict):
        return labels_model.Label.get_labels(db, skip, limit)

    return JSONResponse(content={"detail": "Access denied"}, status_code=403)


# Get label by label_id
@router.get("/label", response_model=labels_schema.LabelRead)
def get_label_by_id(
        label_id: str = Body(default=None, embed=True),
        Authorization: Optional[str] = Header(None),
        db: Session = Depends(get_db)
):
    user_token = jwt_token(Authorization)
    if isinstance(user_token, dict):
        label = labels_model.Label.get_label_by_id(db, label_id)

        try:
            if user_token.get("user_id") == str(label.owner_id):
                return label
        except Exception as err:
            print(err)
    return JSONResponse(content={"detail": "Access denied"}, status_code=403)


# Create a label
@router.post("/label", response_model=labels_schema.LabelRead)
def create_label(
        label: labels_schema.LabelCreate,
        Authorization: Optional[str] = Header(None),
        db: Session = Depends(get_db)
):
    user_token = jwt_token(Authorization)
    if isinstance(user_token, dict):
        label_obj = labels_model.Label(**label.dict())
        label_obj.owner_id = user_token.get("user_id")
        return label_obj.save_db(db)

    return JSONResponse(content={"detail": "Access denied"}, status_code=403)