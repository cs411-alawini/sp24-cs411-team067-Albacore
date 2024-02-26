from fastapi import APIRouter
from typing import Any, Union, List
from pydantic import BaseModel
from ..db import db_instance
from ..db.db_instance import get_cursor
from fastapi.responses import JSONResponse

router = APIRouter()

class Credential(BaseModel):
    netid: str
    password: str
    majorid: int

headers = [{"field": "netid", "headerName": "NetID"},{"field": "password", "headerName": "Password"},{"field": "majorid", "headerName" : "MajorID"}]

@router.get("/api/credentials")
async def get_credentials():
    cursor = get_cursor()
    cursor.execute("SELECT * from students")
    rows = cursor.fetchall()
    credentials = [Credential(netid=row['netid'], password=row['password'], majorid=row['majorid']) for row in rows]
    return JSONResponse(content={"credentials": [credential.dict() for credential in credentials], "table_headers":headers})