from backend.db import session
from backend.models.wedding import Wedding
from backend.main import app
from sqlalchemy.orm import Session


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/create")
async def create_wedding(text: str, is_complete: bool = False):
    wedding = Wedding(text=text, completed=is_complete)
    session.add(wedding)
    session.commit()
    return {"wedding added": wedding.text}
