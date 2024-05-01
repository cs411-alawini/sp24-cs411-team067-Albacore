from fastapi import APIRouter, HTTPException, Depends
from typing import Any, Union, List, Optional
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

class SectionComputerStat(BaseModel):
    os: str
    nummonitors: int
    count: int
    id: Optional[int]

@router.get("/api/computer_map/{location}", dependencies=[Depends(JWTBearer())], tags={"ComputerMap"})
async def get_computers(location: int):
    try:
        async with get_cursor() as cursor:
            await cursor.callproc("CreativeCompMap", (location,))
            results = []
            initial_results = await cursor.fetchall() # Async connector does not have stored results
            results.append(initial_results)
            async for result_set in ResultSets(cursor):
                results.append(result_set)
            results = results[0]
            print(results)
            stats = [SectionComputerStat(id=i, os=row['OS'], nummonitors=row['NumMonitors'], count=row['count']) for i, row in enumerate(results)]
            return JSONResponse(content={"ComputerStat": [stat.dict() for stat in stats]})
    except Exception as error:
        print("error occurred: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for Computers")