from enum import Enum
from typing import Optional
from pydantic import BaseModel


class Status(str, Enum):
    pending = "pending"
    attending = "attending"
    decline = "decline"


class GuestBase(BaseModel):
    first_name: str
    last_name: str
    address_1: str
    street: str
    city: str
    state: str
    zipcode: int
    phone_number: int
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

    class Config:
        orm_mode = True


class GuestCreate(GuestBase):
    pass


class HttpError(BaseModel):
    message: str
