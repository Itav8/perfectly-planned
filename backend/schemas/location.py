from pydantic import BaseModel
from backend.schemas.wedding import Wedding


class LocationBase(BaseModel):
    location_name: str
    location_address: str
    location_street: str
    location_city: str
    location_state: str
    location_zipcode: int
    location_phone_number: int
    location_category: str
    location_cost: int
    location_rating: int


class LocationCreate(LocationBase):
    wedding_id: int


class Location(LocationBase):
    location_id: int

    class Config:
        orm_mode = True


class LocationOut(LocationBase):
    location_id: int
    wedding_id: int
    wedding: Wedding = None


class HttpError(BaseModel):
    message: str
