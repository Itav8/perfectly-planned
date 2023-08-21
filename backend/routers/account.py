from db import get_db
from models.account import AccountModel
from schemas.account import AccountBase, AccountOut, HttpError
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from fastapi import APIRouter, Depends, HTTPException, status

router = APIRouter()


@router.post("/create/account", response_model=AccountOut | HttpError)
async def create_account(account: AccountBase, db: Session = Depends(get_db)):
    try:
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


@router.get("/account/{account_id}", response_model=AccountOut | HttpError)
async def get_account(account_id: str, db: Session = Depends(get_db)):
    try:
        # Fetch the account record from the database
        account = db.query(AccountModel).get(account_id)

        # Check if the account record exists
        if account:
            return account
        else:
            # If the account record with the given ID doesn't exist, raise an HTTPException with status code 404 (Not Found)
            return {"message": "account not found"}
    except SQLAlchemyError as e:
        print(str(e))
        raise HTTPException(
            status_code=500,
            detail="Error account not found. Please try again later.",
        )
