from fastapi import FastAPI
from backend.db import Base, engine
from backend.routers import wedding, guests


Base.metadata.create_all(engine)

app = FastAPI()

app.include_router(wedding.router)
app.include_router(guests.router)

@app.get("/")
async def root():
    return {"message": "Hello World"}
