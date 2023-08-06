from backend.db import get_db
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from fastapi import APIRouter, Depends, HTTPException, status
from backend.models.location import LocationModel

from backend.schemas.location import HttpError, LocationCreate, LocationOut


router = APIRouter()


@router.post("/create/location", response_model=LocationOut | HttpError)
async def create_location(location: LocationCreate, db: Session = Depends(get_db)):
    try:
        new_location = LocationModel(**location.dict())
        db.add(new_location)
        db.commit()
        db.refresh(new_location)
        print("LOCATION", new_location)
        return new_location
    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating location. Please try again later.",
        )
