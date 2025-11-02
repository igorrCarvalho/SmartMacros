from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "SmartMacros API"
    DATABASE_URL: str
    CORS_ORIGINS: list[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]
    ALLOW_DEV_HEADER: bool = True

    class Config:
        env_file = ".env"

settings = Settings()