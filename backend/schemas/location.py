from datetime import datetime
from pydantic import BaseModel
from typing import Optional


class LocationBase(BaseModel):
    location_name: str
    location_lat: float
    location_long: float
    location_address: str
    location_street: str
    location_city: str
    location_state: str
    location_zipcode: int
    location_phone_number: int
    location_category: str
    location_cost: float
    location_rating: float


class LocationCreate(LocationBase):
    wedding_id: Optional[int]
    event_id: Optional[int]


class Location(LocationBase):
    location_id: int

    class Config:
        orm_mode = True


class LocationOut(LocationBase):
    location_id: int
    location_created: datetime


class HttpError(BaseModel):
    message: str
