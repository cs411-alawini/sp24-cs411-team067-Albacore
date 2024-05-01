from fastapi import APIRouter, HTTPException, Depends
from typing import Any, Union, List, Optional
from pydantic import BaseModel
from ..db import db_instance
from ..db.db_instance import get_cursor, ResultSets
from fastapi.responses import JSONResponse
from ..auth.auth_handler import decodeJWT
from ..auth.auth_bearer import JWTBearer
import logging
router = APIRouter()
class Inventory(BaseModel):
    item_id: int
    bldg_name: Optional[str] = None
    item_name: str
    availability: bool = None
    condition: Optional[str] = None
    location_id: int
    duration: Optional[int] = None
    AverageTime: float =None

class LateCountTableMajor(BaseModel):
    major_id: int
    major_name: str
    late_count: int

class BrokenInFacility(BaseModel):
    bldg_name: str
    num_broken: int

logging.basicConfig(level=logging.INFO)  # Adjust the logging level as needed




@router.get("/api/admin/stats", dependencies=[Depends(JWTBearer())], tags=["AdminStats"])
async def get_admin_stats(token_payload: dict = Depends(JWTBearer())):
    jwt_info = decodeJWT(token_payload)
    try:
        async with get_cursor() as cursor:
            if (jwt_info['role'] == 'admin'):
                await cursor.callproc('AdminProblems')
                results = []
                initial_results = await cursor.fetchall()
                results.append(initial_results)
                async for result_set in ResultSets(cursor):
                    results.append(result_set)
                results_first = results[0]
                late_count = [LateCountTableMajor(major_id=row["MajorID"], major_name=row["MAjorName"], late_count=row["LateCount"]) for row in results_first]
                results_second = results[1]
                broken_stat = [BrokenInFacility(bldg_name=row["BldgName"], num_broken=row["Num_Broken"]) for row in results_second]
                print("all_inventory", late_count)
                return JSONResponse(content={"LateCount": [row.dict() for row in late_count], "BrokenStat": [row.dict() for row in broken_stat]})
            else:
                raise HTTPException(status_code=401, detail="User is not authorized to perform this action")
    except Exception as error:
        print("error occurred: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for adminstats")


@router.get("/api/inventory", dependencies=[Depends(JWTBearer())], tags=["Inventory"])
async def get_inventory(token_payload: dict = Depends(JWTBearer())):
    jwt_info = decodeJWT(token_payload)
    try:
        async with get_cursor() as cursor:
            if (jwt_info['role'] == 'admin'):
                # await cursor.callproc("GetAllItems")
                await cursor.callproc("GetInventoryDetailsAdmin")
            else:
                # await cursor.callproc("GetAllowedItems", (jwt_info['user_id'],))
                logging.info("HERE")
                await cursor.callproc("GetInventoryDetails", (jwt_info['user_id'],))
            results = []
            initial_results = await cursor.fetchall() # Async connector does not have stored results
            results.append(initial_results)
            async for result_set in ResultSets(cursor):
                results.append(result_set)
            results = results[0]
            print(results[0]["AverageTime"])
            # logging.info(results)
            all_inventory = [Inventory(item_id=row['ItemID'], bldg_name=row['BldgName'], item_name=row['ItemName'], availability=row['Availability'], condition=translate_condition(row['Condition']), location_id=row["LocationID"], duration=row["Duration"], AverageTime=row["AverageTime"]) for row in results]
            print(all_inventory[0])
            return JSONResponse(content={"Inventory": [inventory.dict() for inventory in all_inventory]})
    except Exception as error:
        print("error occurred: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for Inventory")

@router.put("/api/admin/inventory/{itemid}", dependencies=[Depends(JWTBearer())], tags=["Inventory"])
async def update_inventory(itemid: int, item: Inventory, token_payload: dict = Depends(JWTBearer())):
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