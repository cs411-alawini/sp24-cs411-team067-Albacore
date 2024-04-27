from fastapi import APIRouter, Depends, HTTPException
from typing import Any, Union, List, Optional
from pydantic import BaseModel, ValidationError
from ..db import db_instance
from ..db.db_instance import get_cursor, ResultSets
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
    try:
        async with get_cursor() as cursor:
            await cursor.callproc("GetFacilities")
            results = []
            initial_results = await cursor.fetchall() # Async connector does not have stored results
            results.append(initial_results)
            async for result_set in ResultSets(cursor):
                results.append(result_set)
            results = results[0]
            facilities = [Facility(location_id=row['LocationID'], bldg_name=row['BldgName'], floor_section=row['FloorSection'], longitude=row['Longitude'], latitude=row['Latitude'], map_url=row['MapURL']) for row in results]
            return JSONResponse(content={"Facilities": [facility.dict() for facility in facilities]})
    except Exception as error:
        print("error occurred: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for Facility")