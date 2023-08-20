from sqlalchemy import Column, Integer, String, Boolean, DateTime, Float
from sqlalchemy.orm import relationship
from db import Base


class WeddingModel(Base):
    __tablename__ = "weddings"

    wedding_id = Column(Integer, primary_key=True)
    wedding_name = Column(String)
    wedding_date = Column(DateTime)
    wedding_theme = Column(String)
    wedding_budget = Column(Float)
    wedding_guest = Column(Integer)
    wedding_venue = Column(String)
    wedding_decorations = Column(String)
    wedding_registry = Column(String)
    wedding_planner = Column(Boolean, default=False)
    wedding_photographer = Column(String)
    completed = Column(Boolean, default=False)

    # guests = relationship("GuestModel", back_populates="wedding")
