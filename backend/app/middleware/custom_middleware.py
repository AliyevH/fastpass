import jwt
import time
from fastapi import Request
from starlette.responses import JSONResponse
from app.utils.jwt_decode import jwt_token

SECRET_KEY  = "603EB60C-3AD0-46DB-92B8-2813689E3272"


async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response


async def login_verification(request: Request, call_next):
    response = await call_next(request)
    if request.url in [
        "http://localhost:8000/auth/login",
        "http://localhost:8000/auth/registration",
        "http://localhost:8000/redoc",
        "http://localhost:8000/docs",
        "http://localhost:8000/openapi.json",
    ]:
        return response

    token = request.headers.get("authorization")
    if token and "Bearer" in token:
        token = jwt_token(token)
        if token:
            return response

    return JSONResponse(content={"detail": "Could not validate credentials"}, status_code=401)



