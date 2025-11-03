from datetime import datetime, timedelta, timezone
from typing import Any, Optional
import jwt  # PyJWT
from passlib.context import CryptContext
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)

def create_access_token(sub: str | Any, minutes: Optional[int] = None) -> str:
    exp_min = minutes if minutes is not None else settings.JWT_EXPIRES_MIN
    now = datetime.now(tz=timezone.utc)
    payload = {"sub": str(sub), "iat": int(now.timestamp()), "exp": int((now + timedelta(minutes=exp_min)).timestamp())}
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALG)

def decode_token(token: str) -> dict:
    return jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALG])