from fastapi import APIRouter
from typing import Any, Union
from pydantic import BaseModel
from ..db import db_instance
from ..db.db_instance import get_cursor

router = APIRouter()

class Credential(BaseModel):
    netid: str
    password: str
    majorID: str

@router.get("/api/credentials")
async def get_credentials():
    cursor = get_cursor()
    cursor.execute("SELECT * from Student")
    result = cursor.fetchall()
    return {"student": result}
