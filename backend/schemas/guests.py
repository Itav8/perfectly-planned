from enum import Enum
from typing import Optional
from pydantic import BaseModel


class Status(str, Enum):
    pending = "pending"
    attending = "attending"
    declined = "declined"


class GuestBase(BaseModel):
    first_name: str
    last_name: str
    address_1: str
    address_2: str
    city: str
    state: str
    zipcode: str
    phone_number: str
    email: str
    status: Status
    bride_guest: bool
    groom_guest: bool
    bridesmaids_guest: bool
    groomsmen_guest: bool
    event_type: str


class Guest(GuestBase):
    wedding_id: Optional[int]
    guest_id: int
    uid: str

    class Config:
        orm_mode = True


class GuestCreate(GuestBase):
    pass


class GuestOut(Guest):
    pass


class HttpError(BaseModel):
    message: str
