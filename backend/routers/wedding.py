from backend.db import get_db
from backend.models.wedding import WeddingModel
from backend.schemas.wedding import HttpError, Wedding, WeddingOut
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

router = APIRouter()


@router.post("/create")
async def create_wedding(wedding: Wedding, db: Session = Depends(get_db)):
    try:
        wedding = WeddingModel(**wedding.dict())
        db.add(wedding)
        db.commit()
        return {"wedding added": wedding}
    except SQLAlchemyError as e:
        error = str(e.__dict__["orig"])
        return error


@router.put("/edit/{wedding_id}", response_model=WeddingOut | HttpError)
async def edit_wedding(
    wedding_id: int, wedding: Wedding, db: Session = Depends(get_db)
):
    try:
        existing_wedding = (
            db.query(WeddingModel).filter(WeddingModel.wedding_id == wedding_id).first()
        )

        if existing_wedding:
            # Update the attributes of the existing_wedding object with the new values
            existing_wedding.name = wedding.name
            existing_wedding.wedding_date = wedding.wedding_date
            existing_wedding.wedding_theme = wedding.wedding_theme
            existing_wedding.wedding_budget = wedding.wedding_budget
            existing_wedding.wedding_guest = wedding.wedding_guest
            existing_wedding.wedding_venue = wedding.wedding_venue
            existing_wedding.wedding_decorations = wedding.wedding_decorations
            existing_wedding.wedding_registry = wedding.wedding_registry
            existing_wedding.wedding_planner = wedding.wedding_planner
            existing_wedding.wedding_photographer = wedding.wedding_photographer
            existing_wedding.completed = wedding.completed
            # Commit the changes to the database
            db.commit()

            # Return the updated wedding details
            return {"wedding_updated": existing_wedding}
        else:
            # If the wedding record with the given ID doesn't exist, you can handle the error accordingly.
            # For example, you can raise an HTTPException or return an error message.
            return {"message": "Wedding not found"}
    except SQLAlchemyError as e:
        error = str(e.__dict__["orig"])
        return error


@router.delete("/weddings/{wedding_id}", response_model=dict)
async def delete_wedding(wedding_id: int, db: Session = Depends(get_db)):
    # Fetch the wedding record from the database
    try:
        existing_wedding = (
            db.query(WeddingModel).filter(WeddingModel.wedding_id == wedding_id).first()
        )

        # Check if the wedding record exists
        if existing_wedding:
            # Delete the wedding record
            db.delete(existing_wedding)
            db.commit()

            # Return a success message
            return {"message": "Wedding deleted successfully"}
        else:
            # If the wedding record with the given ID doesn't exist, raise an HTTPException with status code 404 (Not Found)
            raise HTTPException(status_code=404, detail="Wedding not found")
    except SQLAlchemyError as e:
        error = str(e.__dict__["orig"])
        return error


@router.get("/weddings/{wedding_id}", response_model=Wedding)
async def get_wedding(wedding_id: int, db: Session = Depends(get_db)):
    try:
        # Fetch the wedding record from the database
        wedding = (
            db.query(WeddingModel).filter(WeddingModel.wedding_id == wedding_id).first()
        )

        # Check if the wedding record exists
        if wedding:
            return wedding
        else:
            # If the wedding record with the given ID doesn't exist, raise an HTTPException with status code 404 (Not Found)
            raise HTTPException(status_code=404, detail="Wedding not found")
    except SQLAlchemyError as e:
        error = str(e.__dict__["orig"])
        return error
