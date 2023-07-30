from pydantic import BaseModel


class Guests(BaseModel):
    first_name: str
    last_name = str
    address_1 = str
    steet = str
    city = str
    state = str
    zipcode = int
    phone_number = int
    email = str
    status = bool
    bride_guest = bool
    groom_guest = bool
    bridemaids_guest = bool
    groosmen_guest = bool

    class Config:
        orm_mode = True


class GuestOut(BaseModel):
    guest_updated: Guests


class HttpError(BaseModel):
    message: str
