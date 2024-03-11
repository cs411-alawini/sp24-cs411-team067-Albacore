from fastapi import APIRouter
from typing import Any, Union, List
from pydantic import BaseModel
from ..db import db_instance
from ..db.db_instance import get_cursor
from fastapi.responses import JSONResponse

router = APIRouter()

class Inventory(BaseModel):
    itemid: int
    itemname: str
    availability: bool
    condition: int
    # display locationid? or just department
    duration: int
