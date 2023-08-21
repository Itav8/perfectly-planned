from schemas.guests import Guest
from schemas.wedding import WeddingBase


class WeddingOut(WeddingBase):
    wedding_id: int
    uid: str


class GuestOut(Guest):
    pass
