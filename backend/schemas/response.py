from backend.schemas.guests import Guest, GuestBase
from backend.schemas.wedding import Wedding, WeddingBase


class WeddingOut(WeddingBase):
    wedding_id: int
    guests: list[Guest] = []


class GuestOut(GuestBase):
    wedding_id: int
    guest_id: int
    wedding: Wedding = None
