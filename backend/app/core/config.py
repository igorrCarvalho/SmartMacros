from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "SmartMacros API"
    DATABASE_URL: str
    CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:9999"]
    ALLOW_DEV_HEADER: bool = True
    JWT_SECRET: str = "dev"
    JWT_ALG: str = "HS256"
    JWT_EXPIRES_MIN: int = 60
    REFRESH_TOKEN_EXPIRES_DAYS: int = 7
    REFRESH_COOKIE_NAME: str = "sm_refresh_token"

    ENV: str = "dev"  # dev|prod

    class Config:
        env_file = ".env"

settings = Settings()