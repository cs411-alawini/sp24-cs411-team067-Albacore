from fastapi import APIRouter, HTTPException, Depends
from typing import Any, Union, List
from pydantic import BaseModel
from ..db import db_instance
from ..db.db_instance import get_cursor
from fastapi.responses import JSONResponse
from ..auth_bearer import JWTBearer
from ..auth_handler import decodeJWT

router = APIRouter()

class Computer(BaseModel):
    itemid: int
    os: str
    nummonitors: int
    availability: bool
    condition: int

@router.get("/api/computers", tags=["Computers"], dependencies=[Depends(JWTBearer())])
async def get_computers():
    pass

@router.put("/api/admin/computers/{itemid}", tags=["Computers"], dependencies=[Depends(JWTBearer())])
async def update_computers(token_payload: dict = Depends(JWTBearer())):
    token = decodeJWT(token_payload)
    if (token["role"] != "admin"):
        raise HTTPException(status_code=401, detail="User is not authorized to perform this action")
    pass