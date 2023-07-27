from backend.db import get_db
from backend.models.wedding import WeddingModel
from backend.schemas.wedding import Wedding
from sqlalchemy.orm import Session

from fastapi import (
    APIRouter,
    Depends,
)

router = APIRouter()


@router.post("/create")
async def create_wedding(wedding: Wedding, db: Session = Depends(get_db)):
    wedding = WeddingModel(**wedding.dict())
    db.add(wedding)
    db.commit()
    return {"wedding added": wedding}


@router.put("/edit/{wedding_id}")
async def edit_wedding(
    wedding_id: int, wedding: Wedding, db: Session = Depends(get_db)
):
    existing_wedding = db.query(WeddingModel).filter(
        WeddingModel.wedding_id == wedding_id
    )

    if existing_wedding:
        # Update the attributes of the existing_wedding object with the new values
        existing_wedding.text = wedding.text
        existing_wedding.wedding_date = wedding.wedding_date
        existing_wedding.wedding_theme = wedding.wedding_theme
        existing_wedding.wedding_budget = wedding.wedding_budget
        existing_wedding.wedding_guest = wedding.wedding_guest
        existing_wedding.wedding_venue = wedding.wedding_venue
        existing_wedding.wedding_decorations = wedding.wedding_decorations
        existing_wedding.wedding_registry = wedding.wedding_registry
        existing_wedding.wedding_planner = wedding.wedding_planner
        existing_wedding.wedding_photographer = wedding.wedding_photographer
        existing_wedding.completed = wedding.completed
        # Commit the changes to the database
        db.commit()

        # Return the updated wedding details
        return {"wedding updated": existing_wedding}
    else:
        # If the wedding record with the given ID doesn't exist, you can handle the error accordingly.
        # For example, you can raise an HTTPException or return an error message.
        return {"message": "Wedding not found"}
