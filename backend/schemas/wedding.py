from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class WeddingBase(BaseModel):
    wedding_name: str
    wedding_date: datetime
    wedding_theme: str
    wedding_budget: float
    wedding_guest: int
    wedding_venue: str
    wedding_decorations: str
    wedding_registry: str
    wedding_planner: bool = False
    wedding_photographer: str
    completed: bool = False


class Wedding(WeddingBase):
    wedding_id: int

    class Config:
        orm_mode = True


class WeddingCreate(WeddingBase):
    pass


class WeddingOut(WeddingBase):
    wedding_id: int
    uid: Optional[str]


class HttpError(BaseModel):
    message: str
