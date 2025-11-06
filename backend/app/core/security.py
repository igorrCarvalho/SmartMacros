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

def create_access_token(sub: str) -> str:
    payload = {
        "sub": str(sub),
        "type": "access",
        "exp": _exp_in_minutes(settings.JWT_EXPIRES_MIN),
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALG)

def decode_token(token: str) -> dict:
    return jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALG])

def _exp_in_minutes(minutes: int) -> datetime:
    return datetime.now(timezone.utc) + timedelta(minutes=minutes)

def _exp_in_days(days: int) -> datetime:
    return datetime.now(timezone.utc) + timedelta(days=days)

def create_refresh_token(sub: str) -> str:
    payload = {
        "sub": sub,
        "type": "refresh",
        "exp": _exp_in_days(settings.REFRESH_TOKEN_EXPIRES_DAYS),
    }
    return jwt.encode(payload, settings.JWT_SECRET, algorithm=settings.JWT_ALG)