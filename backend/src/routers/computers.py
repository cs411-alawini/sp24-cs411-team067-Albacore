from fastapi import APIRouter, HTTPException, Depends
from typing import Any, Union, List
from pydantic import BaseModel
from ..db import db_instance
from ..db.db_instance import get_cursor, ResultSets
from fastapi.responses import JSONResponse
from ..auth.auth_bearer import JWTBearer
from ..auth.auth_handler import decodeJWT
from collections import defaultdict

router = APIRouter()

translate_condition = defaultdict(lambda: 'Unknown', {
    0: 'Poor',
    1: 'Good',
    2: 'Excellent'
})

class Computer(BaseModel):
    itemid: int
    bldg_name: str
    location_id: int
    os: str
    nummonitors: int
    availability: bool
    condition: int

@router.get("/api/computers", tags=["Computers"], dependencies=[Depends(JWTBearer())])
async def get_computers(token_payload: dict = Depends(JWTBearer())):
    jwt_info = decodeJWT(token_payload)
    try:
        async with get_cursor() as cursor:
            if (jwt_info['role'] == 'admin'):
                await cursor.callproc("GetAllComputers")
            else:
                await cursor.callproc("GetAllowedComputers", (jwt_info['user_id'],))
            results = []
            initial_results = await cursor.fetchall() # Async connector does not have stored results
            results.append(initial_results)
            async for result_set in ResultSets(cursor):
                results.append(result_set)
            results = results[0]
            computers = [Computer(item_id=row['ItemID'], os=row['OS'], nummonitors=row['NumMonitors'], availability=row['Availability'], condition=translate_condition[row['Condition']]) for row in results]
            return JSONResponse(content={"Computers": [computer.dict() for computer in computers]})
    except Exception as error:
        print("error occurred: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for Computers")

@router.put("/api/admin/computers/{itemid}", tags=["Computers"], dependencies=[Depends(JWTBearer())])
async def update_computers(computer: Computer, token_payload: dict = Depends(JWTBearer())):
    token = decodeJWT(token_payload)
    if (token["role"] != "admin"):
        raise HTTPException(status_code=401, detail="User is not authorized to perform this action")
    try:
        async with get_cursor() as cursor:
            await cursor.callproc("UpdateComputer", (computer.itemid, computer.location_id, computer.os, computer.nummonitors, computer.availability, computer.condition,))
    except Exception as error:
        print("error occured: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for Inventory")