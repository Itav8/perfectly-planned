from backend.db import get_db
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from backend.models.guests import GuestModel
from backend.schemas.guests import GuestOut, Guests, HttpError

router = APIRouter()


@router.post("/create")
async def create_guest(guest: Guests, db: Session = Depends(get_db)):
    try:
        guest = GuestModel(**guest.dict())
        db.add(guest)
        db.commit()
        return {"Guest added": guest}
    except SQLAlchemyError as e:
        error = str(e.__dict__["orig"])
        return error


@router.put("/edit/{guest_id}", response_model=GuestOut | HttpError)
async def edit_guest(guest_id: int, guest: Guests, db: Session = Depends(get_db)):
    try:
        existing_guest = (
            db.query(GuestModel).filter(GuestModel.guest_id == guest_id).first()
        )

        if existing_guest:
            # Update the attributes of the existing_guest object with the new values
            existing_guest.first_name = guest.first_name
            existing_guest.last_name = guest.last_name
            existing_guest.address_1 = guest.address_1
            existing_guest.steet = guest.steet
            existing_guest.city = guest.city
            existing_guest.state = guest.state
            existing_guest.zipcode = guest.zipcode
            existing_guest.phone_number = guest.phone_number
            existing_guest.email = guest.email
            existing_guest.status = guest.status
            existing_guest.bride_guest = guest.bride_guest
            existing_guest.groom_guest = guest.groom_guest
            existing_guest.bridemaids_guest = guest.bridemaids_guest
            existing_guest.groosmen_guest = guest.groosmen_guest
            # Commit the changes to the database
            db.commit()
            # Return the updated guest details
            return {"guest_updated": existing_guest}
        else:
            # If the guest record with the given ID doesn't exist, you can handle the error accordingly.
            # For example, you can raise an HTTPException or return an error message.
            return {"message": "Guest not found"}
    except SQLAlchemyError as e:
        error = str(e.__dict__["orig"])
        return error


@router.get("/guests", response_model=list[Guests])
async def list_guests(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        guests = db.query(GuestModel).offset(skip).limit(limit)
        return guests.all()
    except SQLAlchemyError as e:
        error = str(e.__dict__["orig"])
        return error


@router.delete("/guests/{guest_id}", response_model=dict)
async def delete_guest(guest_id: int, db: Session = Depends(get_db)):
    try:
        existing_guest = (
            db.query(GuestModel).filter(GuestModel.guest_id == guest_id).first()
        )

        if existing_guest:
            db.delete(existing_guest)
            db.commit()

            return {"message": "Wedding deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Guest not found")
    except SQLAlchemyError as e:
        error = str(e.__dict__["orig"])
        return error
