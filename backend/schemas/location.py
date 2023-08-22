from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class LocationBase(BaseModel):
    location_name: str
    location_lat: float
    location_long: float
    location_address: str
    location_city: str
    location_state: str
    location_zipcode: str
    location_phone_number: str
    location_category: str
    location_cost: float
    location_rating: float
    account_uid: str


class LocationCreate(LocationBase):
    wedding_id: Optional[int]
    event_id: Optional[int]
    account_uid: str


class Location(LocationBase):
    location_id: int

    class Config:
        orm_mode = True


class LocationOut(LocationBase):
    location_id: int
    location_created: datetime


class HttpError(BaseModel):
    message: str
