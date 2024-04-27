from fastapi import APIRouter, Depends
from typing import Any, Union, List, Optional
from pydantic import BaseModel, ValidationError
from ..db import db_instance
from ..db.db_instance import get_cursor
from fastapi.responses import JSONResponse
from ..auth.auth_bearer import JWTBearer
import logging

router = APIRouter()

class Facility(BaseModel):
    location_id: int
    bldg_name: str
    floor_section: str
    longitude: float
    latitude: float
    map_url: Optional[str] = None

@router.get("/api/facilities", tags=["Facilities"], dependencies=[Depends(JWTBearer())])
async def get_facilities():
    async with get_cursor() as cursor:
        query = "SELECT * from Facilities"
        await cursor.execute(query)
        rows = await cursor.fetchall()
        facilities = [Facility(location_id=row['LocationID'], bldg_name=row['BldgName'], floor_section=row['FloorSection'], longitude=row['Longitude'], latitude=row['Latitude'], map_url=row['MapURL']) for row in rows]
        print(facilities)
        return JSONResponse(content={"Facilities": [facility.dict() for facility in facilities]})