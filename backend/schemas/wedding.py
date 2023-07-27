from datetime import datetime
from pydantic import BaseModel


class Wedding(BaseModel):
    text: str
    wedding_date: datetime
    wedding_theme: str
    wedding_budget: int
    wedding_guest: int
    wedding_venue: str
    wedding_decorations: str
    wedding_registry: str
    wedding_planner: bool
    wedding_photographer: str
    completed: bool

    class Config:
        orm_mode = True
