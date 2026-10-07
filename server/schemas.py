from datetime import datetime
from pydantic import BaseModel, ConfigDict

class WorkspaceCreate(BaseModel):
    name : str
    # provider and model are strings for now.
    provider : str
    model_name : str

class WorkspaceResponse(BaseModel):
    id: int
    name:str
    provider:str
    model_name:str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)