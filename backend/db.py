import os
# Import necessary modules from SQLAlchemy library
from sqlalchemy import create_engine
from sqlalchemy.engine import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

# Get the database URL from an environment variable set in docker-compose.yml
DATABASE_URL = os.environ['DATABASE_URL']

# Create a SQLAlchemy engine with the defined URL
engine = create_engine(DATABASE_URL)

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
