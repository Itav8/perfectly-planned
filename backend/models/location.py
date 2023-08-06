from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from backend.db import Base


class LocationModel(Base):
    __tablename__ = "locations"

    location_id = Column(Integer, primary_key=True)
    location_name = Column(String)
    location_address = Column(String)
    location_street = Column(String)
    location_city = Column(String)
    location_state = Column(String)
    location_zipcode = Column(Integer)
    location_phone_number = Column(Integer)
    location_category = Column(String)
    location_cost = Column(Integer)
    location_rating = Column(Integer)
    wedding_id = Column(Integer, ForeignKey("weddings.wedding_id"))

    wedding = relationship("WeddingModel", back_populates="location")
