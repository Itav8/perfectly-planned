from sqlalchemy import Column, String
from db import Base


class AccountModel(Base):
    __tablename__ = "accounts"

    uid = Column(String, primary_key=True)
    email = Column(String)