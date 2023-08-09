from schemas.guests import Guest
from schemas.wedding import Wedding, WeddingBase


class WeddingOut(WeddingBase):
    wedding_id: int
    guests: list[Guest] = []


class GuestOut(Guest):
    # wedding_id: int
    # guest_id: int
    wedding: Wedding = None
