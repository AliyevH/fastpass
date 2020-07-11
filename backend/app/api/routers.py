from fastapi import APIRouter
from app.api.endpoints import users_api, servers_api, auth_api

api_router = APIRouter()

api_router.include_router(users_api.router)
api_router.include_router(servers_api.router)
api_router.include_router(auth_api.router)