from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from db import Base
from enum import Enum as PyEnum


class Status(PyEnum):
    pending = "pending"
    attending = "attending"
    decline = "decline"


class GuestModel(Base):
    __tablename__ = "guests"

    guest_id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    address_1 = Column(String)
    street = Column(String)
    city = Column(String)
    state = Column(String)
    zipcode = Column(Integer)
    phone_number = Column(Integer)
    email = Column(String)
    status = Column(String, default=Status.pending.value)
    bride_guest = Column(Boolean)
    groom_guest = Column(Boolean)
    bridesmaids_guest = Column(Boolean)
    groomsmen_guest = Column(Boolean)
    wedding_id = Column(Integer)
    event_type = Column(String)

    # wedding = relationship("WeddingModel", back_populates="guests")
