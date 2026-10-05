from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Argo API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React/Vite frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "FastAPI is running"}

@app.get("/health")
def health():
    return {"status" : "ok"}

@app.get("/health/message")
def health_message():
    return {
        "message" : "Server is healthy!"
    }

