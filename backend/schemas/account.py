from pydantic import BaseModel


class AccountBase(BaseModel):
    uid: str
    email: str


class AccountOut(AccountBase):
    pass


class HttpError(BaseModel):
    message: str
