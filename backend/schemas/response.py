from backend.schemas.guests import Guest
from backend.schemas.location import Location
from backend.schemas.wedding import Wedding, WeddingBase


class WeddingOut(WeddingBase):
    wedding_id: int
    guests: list[Guest] = []


class GuestOut(Guest):
    # wedding_id: int
    # guest_id: int
    wedding: Wedding = None
