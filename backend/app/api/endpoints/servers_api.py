from fastapi import APIRouter, Depends, Header, Body
from typing import List, Optional

from sqlalchemy.orm import Session
from starlette.responses import JSONResponse

from app.models import servers_models, labels_model
from app.schemas import servers_schema
from app.crud.init_db import get_db
from app.utils.jwt_decode import jwt_token
from app.utils.aes_enc_dec import encrypt

router = APIRouter()


@router.get("/servers", response_model=List[servers_schema.Servers])
async def get_servers(
        skip: int = 0,
        limit: int = 100,
        Authorization: Optional[str] = Header(None),
        db: Session = Depends(get_db)
):
    user_token = jwt_token(Authorization)
    if isinstance(user_token, dict) and user_token.get("user_email") == "admin@fastpass.com":
        return servers_models.Server.get_servers(db, skip, limit)
    return JSONResponse(content={"msg": "Access denied"}, status_code=403)


@router.get("/server", response_model=servers_schema.ServerRead)
async def get_server_by_id(
        server_id: str = Body(default=None, embed=True),
        secret_key: str = Body(default=None, embed=True),
        Authorization: Optional[str] = Header(None),
        db: Session = Depends(get_db)
):
    user_token = jwt_token(Authorization)
    if isinstance(user_token, dict):
        try:
            server = servers_models.Server.get_server_by_id(db, server_id, secret_key)
            if server:
                return server
        except Exception as err:
            print(err)


@router.post("/servers", response_model=servers_schema.ServerBase)
async def create_server(
        server: servers_schema.ServerCreate,
        Authorization: Optional[str] = Header(None),
        db: Session = Depends(get_db)
):
    user_token = jwt_token(Authorization)
    if isinstance(user_token, dict):
        label = labels_model.Label.get_label_by_id(db, server.label_id)

        if label and str(label.owner_id) == user_token.get("user_id"):
            ciphertext = encrypt(server.password, server.secret_key)

            server = server.dict(exclude={"secret_key", "password"})
            server.update(**{"ciphertext": ciphertext, "owner_id": user_token.get("user_id")})

            server = servers_models.Server(**server)

            print(server)

            server.save_db(db)

            return server
    return JSONResponse(content={"msg": "Access denied"}, status_code=403)