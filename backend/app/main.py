from fastapi import FastAPI
from app.api.routers import api_router
from app.models.base_db import Base
from starlette.middleware.base import BaseHTTPMiddleware
from app.middleware.custom_middleware import add_process_time_header, login_verification

app = FastAPI()

app.include_router(api_router)

app.add_middleware(BaseHTTPMiddleware, dispatch=add_process_time_header)
app.add_middleware(BaseHTTPMiddleware, dispatch=login_verification)