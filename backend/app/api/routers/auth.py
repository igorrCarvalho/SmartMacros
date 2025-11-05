from fastapi import APIRouter, Depends, HTTPException, status, Request, Response
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps.db import get_session
from app.api.deps.auth import get_current_user
from app.schemas.auth import Signup, Login, Token
from app.schemas.user import UserRead
from app.core.security import create_access_token, create_refresh_token, decode_token, get_password_hash, verify_password
from app.repositories.user_repo import get_by_email, create as repo_create
from app.models.user import User
from app.core.config import settings

auth_router = APIRouter(prefix="/auth", tags=["auth"])

def set_refresh_cookie(response: Response, token: str):
    if settings.ENV == "prod":
        response.set_cookie(
            key=settings.REFRESH_COOKIE_NAME,
            value=token,
            httponly=True,
            secure=True,
            samesite="None",
            path="/api/v1/auth/refresh",
            max_age=60 * 60 * 24 * settings.REFRESH_TOKEN_EXPIRES_DAYS,
        )
    else:
        response.set_cookie(
            key=settings.REFRESH_COOKIE_NAME,
            value=token,
            httponly=True,
            secure=False,
            samesite="Lax",
            path="/",
            max_age=60 * 60 * 24 * settings.REFRESH_TOKEN_EXPIRES_DAYS,
        )

def clear_refresh_cookie(response: Response):
    response.delete_cookie(key=settings.REFRESH_COOKIE_NAME, path="/")

@auth_router.post("/signup", response_model=UserRead, status_code=201)
async def signup(body: Signup, session: AsyncSession = Depends(get_session)):
    exists = await get_by_email(session, body.email)
    if exists:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email already registered")
    user = await repo_create(session, body.email, get_password_hash(body.password))
    await session.commit()
    await session.refresh(user)
    return UserRead.model_validate(user)

@auth_router.post("/login", response_model=Token)
async def login(body: dict, response: Response, session: AsyncSession = Depends(get_session)):
    email = body["email"]; password = body["password"]
    user = await get_by_email(session, email)
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    access = create_access_token(sub=user.email)
    refresh = create_refresh_token(sub=user.email)
    set_refresh_cookie(response, refresh)
    return {"access_token": access}

@auth_router.post("/refresh")
async def refresh(request: Request, response: Response):
    token = request.cookies.get(settings.REFRESH_COOKIE_NAME)
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No refresh cookie")
    try:
        payload = decode_token(token)
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")
    if payload.get("type") != "refresh":
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token type")

    email = payload.get("sub")

    new_refresh = create_refresh_token(sub=email)
    set_refresh_cookie(response, new_refresh)

    new_access = create_access_token(sub=email)
    return {"access_token": new_access}

@auth_router.get("/me", response_model=UserRead)
async def me(current: User = Depends(get_current_user)):
    return UserRead.model_validate(current)
    