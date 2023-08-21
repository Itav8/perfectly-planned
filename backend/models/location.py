from sqlalchemy import Column, ForeignKey, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from db import Base


class LocationModel(Base):
    __tablename__ = "locations"

    location_id = Column(Integer, primary_key=True)
    location_name = Column(String)
    location_lat = Column(Float)
    location_long = Column(Float)
    location_address = Column(String)
    location_city = Column(String)
    location_state = Column(String)
    location_zipcode = Column(Integer)
    location_phone_number = Column(Integer)
    location_category = Column(String)
    location_cost = Column(Float)
    location_rating = Column(Float)
    location_created = Column(DateTime, server_default=func.now())
    wedding_id = Column(Integer)
    event_id = Column(Integer)
    uid = Column(String, ForeignKey("account.uid"))
