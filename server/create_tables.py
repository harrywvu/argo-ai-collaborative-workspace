from database import Base, engine
from models import Workspace

Base.metadata.create_all(bind=engine)