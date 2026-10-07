from pydantic_settings import BaseSettings, SettingsConfigDict
from pathlib import Path

class Settings(BaseSettings):
    db_url : str

    # runs the .env beside itselff
    model_config = SettingsConfigDict(
        env_file=Path(__file__).parent / ".env"
    )



settings = Settings()
