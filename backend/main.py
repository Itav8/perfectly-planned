from fastapi import FastAPI
from db import Base, engine
from routers import wedding, guests, location
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(engine)

app = FastAPI()

app.include_router(wedding.router)
app.include_router(guests.router)
app.include_router(location.router)


origins = [
    "http://localhost:5173",
    "https://perfectly-planned-spa.onrender.com"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"message": "Hello World"}
