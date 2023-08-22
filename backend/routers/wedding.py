from db import get_db
from models.wedding import WeddingModel
from schemas.wedding import HttpError, WeddingBase, WeddingCreate, WeddingOut
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()


@router.post("/wedding/create", response_model=WeddingOut | HttpError)
async def create_wedding(wedding: WeddingCreate, db: Session = Depends(get_db)):
    try:
        new_wedding = WeddingModel(**wedding.model_dump())
        db.add(new_wedding)
        db.commit()
        db.refresh(new_wedding)

        return new_wedding
    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating wedding. Please try again later.",
        )


@router.get("/wedding/get/{wedding_id}", response_model=WeddingOut | HttpError)
async def get_wedding(wedding_id: int, db: Session = Depends(get_db)):
    try:
        # Fetch the wedding record from the database
        wedding = db.query(WeddingModel).get(wedding_id)

        # Check if the wedding record exists
        if wedding:
            return wedding
        else:
            # If the wedding record with the given ID doesn't exist, raise an HTTPException with status code 404 (Not Found)
            return {"message": "Wedding not found"}
    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=500,
            detail="Error wedding not found. Please try again later.",
        )


@router.get("/wedding/list/{account_uid}", response_model=list[WeddingOut] | HttpError)
async def list_weddings(account_uid: str, db: Session = Depends(get_db)):
    try:
        weddings = db.query(WeddingModel).filter(
            WeddingModel.account_uid == account_uid
        )
        if weddings:
            return weddings

        return {"message": "List is empty"}
    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=500,
            detail="Error getting list of weddings. Please try again later.",
        )


@router.put("/wedding/edit/{wedding_id}", response_model=WeddingOut | HttpError)
async def edit_wedding(
    wedding_id: int, wedding: WeddingBase, db: Session = Depends(get_db)
):
    try:
        existing_wedding: WeddingModel = db.query(WeddingModel).get(wedding_id)

        if existing_wedding:
            # Update the attributes of the existing_wedding object with the new values
            existing_wedding.wedding_name = wedding.wedding_name
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
            existing_wedding.account_uid = wedding.account_uid
            # Commit the changes to the database
            db.commit()
            db.refresh(existing_wedding)
            # Return the updated wedding details
            return existing_wedding
        else:
            # If the wedding record with the given ID doesn't exist, you can handle the error accordingly.
            # For example, you can raise an HTTPException or return an error message.
            return {"message": "Wedding not found"}
    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=500,
            detail="Error updating wedding. Please try again later.",
        )


@router.delete("/wedding/delete/{wedding_id}", response_model=dict | HttpError)
async def delete_wedding(wedding_id: int, db: Session = Depends(get_db)):
    # Fetch the wedding record from the database
    try:
        existing_wedding = db.query(WeddingModel).get(wedding_id)

        # Check if the wedding record exists
        if existing_wedding:
            # Delete the wedding record
            db.delete(existing_wedding)
            db.commit()

            # Return a success message
            return {"message": "Wedding deleted successfully"}
        else:
            # If the wedding record with the given ID doesn't exist, raise an HTTPException with status code 404 (Not Found)
            {"message": "Wedding deleted unsuccessfully"}
    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=500,
            detail="Error deleting wedding. Please try again later.",
        )
