from sqlalchemy import Column, Integer, String, Boolean
from backend.db import Base


class Wedding(Base):
    __tablename__ = "weddings"

    wedding_id = Column(Integer, primary_key=True)
    text = Column(String)
    completed = Column(Boolean, default=False)
