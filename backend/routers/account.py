from db import get_db
from models.account import AccountModel
from schemas.account import AccountBase, AccountOut, HttpError
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()


@router.post("/account", response_model=AccountOut | HttpError)
async def create_account(account: AccountBase, db: Session = Depends(get_db)):
    try:
        # Fetch the account record from the database
        existing_account = db.query(AccountModel).get(account.uid)

        if existing_account:
            return existing_account

        new_account = AccountModel(**account.model_dump())
        db.add(new_account)
        db.commit()
        db.refresh(new_account)

        return new_account
    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error creating account. Please try again later.",
        )
