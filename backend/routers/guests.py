from backend.db import get_db
from backend.models.guests import GuestModel
from backend.schemas.guests import HttpError, GuestCreate, GuestBase
from backend.schemas.response import GuestOut
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from fastapi import APIRouter, Depends, HTTPException, status


router = APIRouter()


@router.post("/create/guest", response_model=GuestOut | HttpError)
async def create_guest(guest: GuestCreate, db: Session = Depends(get_db)):
    try:
        new_guest = GuestModel(**guest.dict())
        db.add(new_guest)
        db.commit()
        db.refresh(new_guest)

        return new_guest
    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating guest. Please try again later.",
        )


@router.get("/guest/{guest_id}", response_model=GuestOut | HttpError)
async def get_guest(guest_id: int, db: Session = Depends(get_db)):
    try:
        guest: GuestModel = db.query(GuestModel).get(guest_id)

        if guest:
            print("Hello guest", guest.__dict__)
            print("WEDDING", guest.wedding.__dict__)
            return guest
        else:
            return {"message": "Guest not found"}

    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=500,
            detail="Error getting guest. Please try again later.",
        )


@router.get("/list/guests", response_model=list[GuestOut])
async def list_guests(db: Session = Depends(get_db)):
    try:
        guests = db.query(GuestModel).all()

        return guests
    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=500,
            detail="Error getting list of guests. Please try again later.",
        )


@router.patch("/edit/{guest_id}", response_model=GuestOut | HttpError)
async def edit_guest(guest_id: int, guest: GuestBase, db: Session = Depends(get_db)):
    try:
        existing_guest: GuestModel = db.query(GuestModel).get(guest_id)

        if existing_guest:
            # Update the attributes of the existing_guest object with the new values
            existing_guest.first_name = guest.first_name
            existing_guest.last_name = guest.last_name
            existing_guest.address_1 = guest.address_1
            existing_guest.street = guest.street
            existing_guest.city = guest.city
            existing_guest.state = guest.state
            existing_guest.zipcode = guest.zipcode
            existing_guest.phone_number = guest.phone_number
            existing_guest.email = guest.email
            existing_guest.status = guest.status
            existing_guest.bride_guest = guest.bride_guest
            existing_guest.groom_guest = guest.groom_guest
            existing_guest.bridesmaids_guest = guest.bridesmaids_guest
            existing_guest.groomsmen_guest = guest.groomsmen_guest
            # Commit the changes to the database
            db.commit()
            db.refresh(existing_guest)

            return existing_guest
        else:
            # If the guest record with the given ID doesn't exist, you can handle the error accordingly.
            # For example, you can raise an HTTPException or return an error message.
            return {"message": "Guest not found"}
    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=500,
            detail="Error updating guest. Please try again later.",
        )


#
# @router.put("/edit/{guest_id}", response_model=GuestOut | HttpError)
# async def update_guest(
#     guest_id: int, guest: GuestBase, db: Session = Depends(get_db)
# ):
#     try:
#         existing_guest = db.query(GuestModel).get(guest_id)
#         if not existing_guest:
#             raise HTTPException(
#                 status_code=status.HTTP_404_NOT_FOUND,
#                 detail="Guest with the given ID not found.",
#             )

#         # Update the guest data based on the provided GuestCreate object
#         existing_guest.first_name = guest.first_name
#         existing_guest.last_name = guest.last_name
#         existing_guest.address_1 = guest.address_1
#         existing_guest.street = guest.street
#         existing_guest.city = guest.city
#         existing_guest.state = guest.state
#         existing_guest.zipcode = guest.zipcode
#         existing_guest.phone_number = guest.phone_number
#         existing_guest.email = guest.email
#         existing_guest.status = guest.status
#         existing_guest.bride_guest = guest.bride_guest
#         existing_guest.groom_guest = guest.groom_guest
#         existing_guest.bridesmaids_guest = guest.bridesmaids_guest
#         existing_guest.groomsmen_guest = guest.groomsmen_guest

#         db.commit()
#         db.refresh(existing_guest)

#         # Get the associated wedding if needed
#         associated_wedding = None
#         if existing_guest.wedding_id:
#             associated_wedding = db.query(WeddingModel).get(existing_guest.wedding_id)

#         # Create the response GuestOut object
#         guest_out = GuestOut(**existing_guest, wedding=associated_wedding)

#         return guest_out
#     except SQLAlchemyError as e:
#         print("WHAT IS THIS", str(e))
#         raise HTTPException(
#             status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
#             detail="Error updating guest. Please try again later.",
#         )


@router.delete("/delete/{guest_id}", response_model=dict | HttpError)
async def delete_guest(guest_id: int, db: Session = Depends(get_db)):
    try:
        existing_guest = db.query(GuestModel).get(guest_id)

        if existing_guest:
            db.delete(existing_guest)
            db.commit()

            return {"message": "Guest deleted successfully"}
        else:
            {"message": "Guest deleted unsuccessfully"}
    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=500,
            detail="Error deleting guest. Please try again later.",
        )
