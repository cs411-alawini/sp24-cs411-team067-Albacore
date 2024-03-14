from fastapi import APIRouter
from typing import Any, Union, List
from pydantic import BaseModel
from ..db import db_instance
from ..db.db_instance import get_cursor
from fastapi.responses import JSONResponse

router = APIRouter()

class Facility(BaseModel):
    location_id: int
    bldg_name: str
    floor_section: str
    longitude: float
    latitude: float
    map_url: str

@router.get("/api/facilities")
async def get_facilities():
    cursor = get_cursor()
    cursor.execute("SELECT * from Inventory")
    rows = cursor.fetchall()
    facilities = [Facility(location_id=row['LocationID'], bldg_name=row['BldgName'], floor_section=row['FloorSection'], longitude=row['Longitude'], latitude=row['Latitude'], map_url=row['MapURL']) for row in rows]
    return JSONResponse(content={"Facilities": [facility.dict() for facility in facilities]})