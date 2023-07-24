from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base


url = URL.create(
    drivername="postgresql",
    username="italizvazquez",
    password="",
    host="localhost",
    database="perfectly_planned",
    port=5432,
)

engine = create_engine(url)
Session = sessionmaker(bind=engine)
session = Session()

Base = declarative_base()
