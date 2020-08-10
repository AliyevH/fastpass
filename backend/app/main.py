from fastapi import FastAPI
from app.api.routers import api_router
from app.crud.init_db import Base
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.middleware.cors import CORSMiddleware
from app.middleware.custom_middleware import add_process_time_header, login_verification

from app.middleware.origins import origins

app = FastAPI()

app.include_router(api_router)

app.add_middleware(BaseHTTPMiddleware, dispatch=add_process_time_header)
app.add_middleware(BaseHTTPMiddleware, dispatch=login_verification)

app.add_middleware(
    CORSMiddleware,
   allow_origins=origins,
   allow_credentials=True,
   allow_methods=["*"],
   allow_headers=["*"]
)