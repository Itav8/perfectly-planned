from backend.db import get_db
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

router = APIRouter()
