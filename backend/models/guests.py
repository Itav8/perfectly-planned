from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from backend.db import Base


class WeddingModel(Base):
    __tablename__ = "guests"

    guest_id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    address_1 = Column(String)
    steet = Column(String)
    city = Column(String)
    state = Column(String)
    zipcode = Column(Integer)
    phone_number = Column(Integer)
    email = Column(String)
    status = Column(Boolean)
    bride_guest = Column(Boolean)
    groom_guest = Column(Boolean)
    bridemaids_guest = Column(Boolean)
    groosmen_guest = Column(Boolean)
    wedding_id = Column(Integer, ForeignKey('wedding_id'))

    wedding = relationship("weddings", back_populates="guests")
