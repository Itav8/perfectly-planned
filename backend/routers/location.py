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

        return new_location

    except SQLAlchemyError as e:
        print("HII", str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating location. Please try again later.",
        )


@router.get("/location/{location_id}", response_model=LocationOut | HttpError)
async def get_location(location_id: int, db: Session = Depends(get_db)):
    try:
        location = db.query(LocationModel).get(location_id)
        print("LOCATION", location)
        if location:
            return location
        else:
            return {"message": "Location not found"}

    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating location. Please try again later.",
        )


@router.get("/locations", response_model=list[LocationOut] | HttpError)
async def list_locations(db: Session = Depends(get_db)):
    try:
        locations = db.query(LocationModel).all()
        print("LOCATION", locations)
        if locations:
            return locations
        else:
            return {"message": "List is empty"}

    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating location. Please try again later.",
        )


@router.delete("/delete/{location_id}", response_model=dict | HttpError)
async def delete_location(location_id: int, db: Session = Depends(get_db)):
    # Fetch the wedding record from the database
    try:
        existing_location = db.query(LocationModel).get(location_id)

        # Check if the wedding record exists
        if existing_location:
            # Delete the wedding record
            db.delete(existing_location)
            db.commit()

            # Return a success message
            return {"message": "Location deleted successfully"}
        else:
            # If the wedding record with the given ID doesn't exist, raise an HTTPException with status code 404 (Not Found)
            {"message": "Location deleted unsuccessfully"}
    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=500,
            detail="Error deleting location. Please try again later.",
        )
