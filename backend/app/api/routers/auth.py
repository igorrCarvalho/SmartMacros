from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.api.deps.db import get_session
from app.api.deps.auth import get_current_user
from app.schemas.auth import Signup, Login, Token
from app.schemas.user import UserRead
from app.core.security import get_password_hash, verify_password, create_access_token
from app.repositories.user_repo import get_by_email, create as repo_create
from app.models.user import User

auth_router = APIRouter(prefix="/auth", tags=["auth"])

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
async def login(body: Login, session: AsyncSession = Depends(get_session)):
    user = await get_by_email(session, body.email)
    if not user or not verify_password(body.password, user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    token = create_access_token(sub=user.email)
    return Token(access_token=token)

@auth_router.get("/me", response_model=UserRead)
async def me(current: User = Depends(get_current_user)):
    return UserRead.model_validate(current)
    