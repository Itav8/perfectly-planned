from sqlalchemy import Column, Integer, String, Boolean
from app.db import Base


class Todo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True)
    text = Column(String)
    completed = Column(Boolean, default=False)
