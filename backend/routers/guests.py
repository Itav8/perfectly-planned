from fastapi.encoders import jsonable_encoder
from db import get_db
from models.guests import GuestModel
from schemas.guests import HttpError, GuestCreate, GuestBase, GuestOut, GuestInvite
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from services.email_service.sender import publish_message
from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()


@router.post("/guest/create", response_model=GuestOut | HttpError)
async def create_guest(guest: GuestCreate, db: Session = Depends(get_db)):
    try:
        new_guest = GuestModel(**guest.model_dump())
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


@router.get("/guest/get/{guest_id}", response_model=GuestOut | HttpError)
async def get_guest(guest_id: int, db: Session = Depends(get_db)):
    try:
        guest: GuestModel = db.query(GuestModel).get(guest_id)

        if guest:
            return guest
        else:
            return {"message": "Guest not found"}

    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=500,
            detail="Error getting guest. Please try again later.",
        )


@router.get("/guest/list/{account_uid}", response_model=list[GuestOut] | HttpError)
async def list_guests(account_uid: str, db: Session = Depends(get_db)):
    try:
        guests = db.query(GuestModel).filter(GuestModel.account_uid == account_uid)
        if guests:
            return guests
        return {"message": "List is empty"}
    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=500,
            detail="Error getting list of guests. Please try again later.",
        )


@router.put("/guest/edit/{guest_id}", response_model=GuestOut | HttpError)
async def edit_guest(guest_id: int, guest: GuestBase, db: Session = Depends(get_db)):
    try:
        existing_guest: GuestModel = db.query(GuestModel).get(guest_id)

        if existing_guest:
            # Update the attributes of the existing_guest object with the new values
            existing_guest.first_name = guest.first_name
            existing_guest.last_name = guest.last_name
            existing_guest.address_1 = guest.address_1
            existing_guest.address_2 = guest.address_2
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
            existing_guest.event_type = guest.event_type
            existing_guest.account_uid = guest.account_uid
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


@router.delete("/guest/delete/{guest_id}", response_model=dict | HttpError)
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


@router.post("/guest/invite", response_model=dict | HttpError)
async def invite_guest(message: GuestInvite):
    try:
        publish_message(jsonable_encoder(message))
        return {"message": "Sent successfully"}
    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=500,
            detail="Error sending email. Please try again later.",
        )
