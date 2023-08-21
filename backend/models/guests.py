from sqlalchemy import Column, ForeignKey, Integer, String, Boolean
from sqlalchemy.orm import relationship
from db import Base
from enum import Enum as PyEnum


class Status(PyEnum):
    pending = "pending"
    attending = "attending"
    declined = "declined"


class GuestModel(Base):
    __tablename__ = "guests"

    guest_id = Column(Integer, primary_key=True)
    first_name = Column(String)
    last_name = Column(String)
    address_1 = Column(String)
    address_2 = Column(String)
    city = Column(String)
    state = Column(String)
    zipcode = Column(String)
    phone_number = Column(String)
    email = Column(String, unique=True)
    status = Column(String, default=Status.pending.value)
    bride_guest = Column(Boolean)
    groom_guest = Column(Boolean)
    bridesmaids_guest = Column(Boolean)
    groomsmen_guest = Column(Boolean)
    wedding_id = Column(Integer)
    event_type = Column(String)
    account_uid = Column(String, ForeignKey("accounts.uid"))

    account = relationship("AccountModel")
