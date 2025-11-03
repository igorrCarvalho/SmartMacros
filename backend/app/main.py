from fastapi import FastAPI
from app.core import session_filters

app = FastAPI(title="SmartMacros API", version="0.1.0")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/hello")
def hello():
    return {"message": "Hello from FastAPI via Docker!"}