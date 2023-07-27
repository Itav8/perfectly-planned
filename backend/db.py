# Import necessary modules from SQLAlchemy library
from sqlalchemy import create_engine
from sqlalchemy.engine import URL
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Define the database connection URL using PostgreSQL as the driver
url = URL.create(
    drivername="postgresql",
    username="italizvazquez",
    password="",  # Enter the password for the database here
    host="localhost",
    database="perfectly_planned",
    port=5432,
)

# Create a SQLAlchemy engine with the defined URL
engine = create_engine(url)

# Create a sessionmaker to interact with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create a base class for declarative models to inherit from
Base = declarative_base()


# Define a function to get a database session
def get_db():
    # Create a new session from the sessionmaker
    db = SessionLocal()
    try:
        # Yield the session to the caller (using a context manager)
        yield db
    finally:
        # Close the session after it's no longer needed
        db.close()
