from fastapi import APIRouter
from typing import Any, Union, List
from pydantic import BaseModel
from ..db import db_instance
from ..db.db_instance import get_cursor
from fastapi.responses import JSONResponse

router = APIRouter()

class Major(BaseModel):
    majorid: int
    majorname: str
    deptname: str