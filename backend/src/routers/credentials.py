from fastapi import APIRouter, HTTPException, Body
from fastapi.encoders import jsonable_encoder
from typing import Any, Union, List
from pydantic import BaseModel, SecretStr, validator, Field
from ..db import db_instance
from ..db.db_instance import get_cursor, get_db_conn
from fastapi.responses import JSONResponse
from mysql.connector import Error
from ..auth_handler import signJWT

router = APIRouter()

class Credential(BaseModel):
    netid: str
    password: SecretStr
    majorid: int

class CredentialLogin(BaseModel):
    netid: str = Field(...)
    password: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "netid": "jdoe1",
                "password": "seven"
            }
        }

users = [{"netid": "jdoe1","password": "seven"}]

@router.get("/api/credentials")
async def get_credentials():
    cursor = get_cursor()
    cursor.execute("SELECT * from students")
    rows = cursor.fetchall()
    credentials = [Credential(netid=row['netid'], password=row['password'], majorid=row['majorid']) for row in rows]
    return JSONResponse(content={"credentials": [jsonable_encoder(credential.dict()) for credential in credentials]})

@router.put("/api/credentials/{netid}")
async def update_credential(netid: str, user: Credential):
    cursor = get_cursor()
    conn = get_db_conn()
    update_cmd = ("UPDATE students SET password = %s, majorid = %s WHERE netid = %s;")
    params = (user.password.get_secret_value(), user.majorid, user.netid)
    try:
        cursor.execute(update_cmd, params)
        conn.commit() 
        return {"Message: ": "Successful update"}
    except Error as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to update user: {e}")

@router.post("/api/user/login", tags=["user"])
async def user_login(user: CredentialLogin = Body(...)):
    print("user info", user)
    if check_user(user):
        print("successful token!!!")
        return signJWT(user.netid)

def check_user(data: CredentialLogin):
    curr_user = data
    print("users: ", users)
    for user in users:
        print("[DOUGHNUT2] user.netid: ", user["netid"])
        if user["netid"] == curr_user.netid and user["password"] == curr_user.password:
            print("check user true!!!")
            return True
    return False