from fastapi import APIRouter, Depends
from typing import Any, Union, List
from pydantic import BaseModel
from ..db import db_instance
from ..db.db_instance import get_cursor
from fastapi.responses import JSONResponse
from ..auth_bearer import JWTBearer

router = APIRouter()

class Inventory(BaseModel):
    item_id: int
    bldg_name: str
    item_name: str
    availability: bool
    condition: str
    location_id: int
    duration: int

@router.get("/api/inventory", dependencies=[Depends(JWTBearer())])
async def get_inventory():
    cursor = get_cursor()
    cursor.execute("SELECT * FROM Inventory JOIN Facilities ON Inventory.LocationID = Facilities.LocationID;")
    rows = cursor.fetchall()
    all_inventory = [Inventory(item_id=row['ItemID'], bldg_name=row['BldgName'], item_name=row['ItemName'], availability=row['Availability'], condition=translate_condition(row['Condition']), location_id=row["LocationID"], duration=row["Duration"]) for row in rows]
    return JSONResponse(content={"Inventory": [inventory.dict() for inventory in all_inventory]})

def translate_condition(condition):
    if condition == 0:
        return "Poor"
    elif condition == 1:
        return "Good"
    elif condition == 2:
        return "Excellent"
    else:
        return "Unknown"