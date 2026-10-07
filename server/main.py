from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from schemas import WorkspaceCreate, WorkspaceResponse
from models import Workspace
from database import get_db
from sqlalchemy.orm import Session

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

@app.post("/workspaces", response_model=WorkspaceResponse, status_code=201)
def create_workspace(workspace: WorkspaceCreate, db: Session = Depends(get_db)):

    new_workspace = Workspace (
        name = workspace.name,
        provider = workspace.provider,
        model_name = workspace.model_name
    )

    db.add(new_workspace)
    db.commit()
    db.refresh(new_workspace)

    return new_workspace