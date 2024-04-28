from fastapi import APIRouter, HTTPException, Depends
from typing import Any, Union, List, Optional
from pydantic import BaseModel
from ..db import db_instance
from ..db.db_instance import get_cursor, ResultSets
from fastapi.responses import JSONResponse
from ..auth.auth_handler import decodeJWT
from ..auth.auth_bearer import JWTBearer

router = APIRouter()
class Inventory(BaseModel):
    item_id: int
    bldg_name: Optional[str] = None
    item_name: str
    availability: bool = None
    condition: Optional[str] = None
    location_id: int
    duration: Optional[int] = None


@router.get("/api/inventory", dependencies=[Depends(JWTBearer())], tags=["Inventory"])
async def get_inventory(token_payload: dict = Depends(JWTBearer())):
    jwt_info = decodeJWT(token_payload)
    try:
        async with get_cursor() as cursor:
            if (jwt_info['role'] == 'admin'):
                await cursor.callproc("GetAllItems")
            else:
                await cursor.callproc("GetAllowedItems", (jwt_info['user_id'],))
            results = []
            initial_results = await cursor.fetchall() # Async connector does not have stored results
            results.append(initial_results)
            async for result_set in ResultSets(cursor):
                results.append(result_set)
            results = results[0]
            all_inventory = [Inventory(item_id=row['ItemID'], bldg_name=row['BldgName'], item_name=row['ItemName'], availability=row['Availability'], condition=translate_condition(row['Condition']), location_id=row["LocationID"], duration=row["Duration"]) for row in results]
            return JSONResponse(content={"Inventory": [inventory.dict() for inventory in all_inventory]})
    except Exception as error:
        print("error occurred: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for Inventory")

@router.put("/api/admin/inventory/{itemid}", dependencies=[Depends(JWTBearer())], tags=["Inventory"])
async def update_inventory(itemid: int, item: Inventory, token_payload: dict = Depends(JWTBearer())):
    print("item: ", item)
    token = decodeJWT(token_payload)
    if (token["role"] != "admin"):
        raise HTTPException(status_code=401, detail="User is not authorized to perform this action")
    try:
        async with get_cursor() as cursor:
            await cursor.callproc("UpdateItem", (item.item_id, item.item_name, item.availability, translate_condition_reverse(item.condition), item.location_id, item.duration,))
            await cursor.connection.commit()
    except Exception as error:
        print("error occured: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for Inventory")

def translate_condition(condition):
    if condition == 0:
        return "Poor"
    elif condition == 1:
        return "Good"
    elif condition == 2:
        return "Excellent"
    else:
        return "Unknown"
    
def translate_condition_reverse(condition):
    if condition == "Poor":
        return 0
    elif condition == "Good":
        return 1
    elif condition == "Excellent":
        return 2
    else:
        return -1