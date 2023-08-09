from db import get_db
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
import requests
from fastapi import APIRouter, Depends, HTTPException, status
from models.location import LocationModel
import os
from schemas.location import (
    HttpError,
    LocationBase,
    LocationCreate,
    LocationOut,
)

GOOGLE_MAPS_API_KEY = os.environ["GOOGLE_MAPS_API_KEY"]
GOOGLE_URL = os.environ["GOOGLE_URL"]

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


@router.post("/edit/{location_id}", response_model=LocationOut | HttpError)
async def edit_location(
    location_id: int, location: LocationBase, db: Session = Depends(get_db)
):
    try:
        existing_location = db.query(LocationModel).get(location_id)

        if existing_location:
            existing_location.location_name = location.location_name
            existing_location.location_lat = location.location_lat
            existing_location.location_long = location.location_long
            existing_location.location_address = location.location_address
            existing_location.location_street = location.location_street
            existing_location.location_city = location.location_city
            existing_location.location_state = location.location_state
            existing_location.location_zipcode = location.location_zipcode
            existing_location.location_phone_number = location.location_phone_number
            existing_location.location_category = location.location_category
            existing_location.location_cost = location.location_cost
            existing_location.location_rating = location.location_rating

            db.commit()
            db.refresh(existing_location)

            return existing_location
        else:
            return {"message": "Location not found"}

    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=500,
            detail="Error updating location. Please try again later.",
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
            return {"message": "Location deleted unsuccessfully"}
    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=500,
            detail="Error deleting location. Please try again later.",
        )


@router.get("/search/location/{query}")
async def search_location(query: str):
    url = f"{GOOGLE_URL}/place/autocomplete/json?input={query}&radius=500&key={GOOGLE_MAPS_API_KEY}"
    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)
    print(response.json())
    return response.json()


@router.get("/details/location/{place_id}")
async def location_details(place_id: str):
    url = (
        f"{GOOGLE_URL}/place/details/json?place_id={place_id}&key={GOOGLE_MAPS_API_KEY}"
    )
    payload = {}
    headers = {}

    response = requests.request("GET", url, headers=headers, data=payload)
    print(response.json())
    return response.json()
