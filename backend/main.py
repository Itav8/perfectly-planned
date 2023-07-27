from fastapi import FastAPI
from backend.db import Base, engine
from backend.models import wedding


from sqlalchemy.orm import Session

wedding.Base.metadata.create_all(bind=engine)

Base.metadata.create_all(engine)

app = FastAPI()


def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()
