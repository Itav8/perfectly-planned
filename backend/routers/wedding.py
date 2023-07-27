from backend.db import session
from backend.models.wedding import Wedding
from backend.schemas import wedding
from backend.main import app
from sqlalchemy.orm import Session


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/create")
async def create_wedding(db: Session, text: wedding.text, is_complete: bool = False):
    wedding = Wedding(**text.dict(), completed=is_complete)
    session.add(wedding)
    session.commit()
    return {"wedding added": wedding.text}
