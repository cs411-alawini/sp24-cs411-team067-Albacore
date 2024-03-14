from fastapi import APIRouter, HTTPException
from typing import Any, Union, List
from pydantic import BaseModel
from ..db import db_instance
from ..db.db_instance import get_cursor, get_db_conn
from fastapi.responses import JSONResponse
from mysql.connector import Error

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

@router.put("/api/credentials/{netid}")
async def update_credential(netid: str, user: Credential):
    cursor = get_cursor()
    conn = get_db_conn()
    update_cmd = ("UPDATE students SET password = %s, majorid = %s WHERE netid = %s;")
    print(update_cmd)
    print("Password: ", user.password)
    params = (user.password, user.majorid, user.netid)
    try:
        cursor.execute(update_cmd, params)
        conn.commit() 
        return {"Message: ": "Successful update"}
    except Error as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to update user: {e}")

