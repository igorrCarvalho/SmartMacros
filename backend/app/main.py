from fastapi import FastAPI
from app.core import session_filters
from app.api.routers import router as api_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="SmartMacros API", version="0.1.0")
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:9999",
        "http://127.0.0.1:9999",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*", "Authorization"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/hello")
def hello():
    return {"message": "Hello from FastAPI via Docker!"}