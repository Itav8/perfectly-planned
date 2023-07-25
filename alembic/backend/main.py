from fastapi import FastAPI
from backend.db import session, Base, engine
from backend.models.wedding import Wedding

Base.metadata.create_all(engine)

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/create")
async def create_wedding(text: str, is_complete: bool = False):
    wedding = Wedding(text=text, completed=is_complete)
    session.add(wedding)
    session.commit()
    return {"wedding added": wedding.text}
