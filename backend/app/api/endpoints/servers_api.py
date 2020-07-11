from fastapi import APIRouter, Depends, Header, Body
from typing import List, Optional
from app.schemas import servers_schema
from app.crud.init_db import get_db
from app.models import servers_models
from sqlalchemy.orm import Session
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


@router.get("/servers/{server_id}", response_model=servers_schema.ServerRead)
async def get_server_by_id(
        server_id: int,
        secret_key: str = Body(..., embed=True),
        Authorization: Optional[str] = Header(None),
        db: Session = Depends(get_db)
):
    user_token = jwt_token(Authorization)
    if isinstance(user_token, dict):
        return servers_models.Server.get_server_by_id(db, server_id,( secret_key*2).encode())



@router.post("/servers", response_model=servers_schema.ServerBase)
async def create_server(
        server: servers_schema.ServerCreate,
        db: Session = Depends(get_db)
):
    ciphertext, tag, nonce = encrypt(server.password.encode(), (server.secret_key*2).encode())
    server = server.dict(exclude={"secret_key", "password"})
    server.update(**{"ciphertext": ciphertext, "tag": tag, "nonce": nonce})
    server = servers_models.Server(**server)
    server.save_db(db)
    return server
