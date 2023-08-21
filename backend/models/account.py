from sqlalchemy import Column, String
from db import Base


class AccountModel(Base):
    __tablename__ = "accounts"

    uid = Column(String, unique=True, primary_key=True)
    email = Column(String, unique=True)
