from fastapi import APIRouter, Depends
from typing import Any, Union, List
from pydantic import BaseModel
from ..db import db_instance
from ..db.db_instance import get_cursor
from fastapi.responses import JSONResponse
from ..auth.auth_bearer import JWTBearer

router = APIRouter()

class Reservations(BaseModel):
    pass

@router.post("/api/reservations", tags=["Reservations"], dependencies=[Depends(JWTBearer())])
async def create_reservation():    
    pass

@router.get("/api/reservations", tags=["Reservations"], dependencies=[Depends(JWTBearer())])
async def get_reservations():
    pass

@router.put("/api/reservations/{reservationid}", tags=["Reservations"], dependencies=[Depends(JWTBearer())])
async def update_reservations():
    pass

# @router.put("/api/admin/reservations", tags=["Reservations"], dependencies=[Depends(JWTBearer())])
# async def admin_update_reservations(): # Special Admin Privileges reservations
#     pass

@router.delete("/api/reservations/{reservationid}", tags=["Reservations"], dependencies=[Depends(JWTBearer())])
async def remove_resrevations():
    pass

