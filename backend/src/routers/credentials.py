from fastapi import APIRouter, HTTPException, Body, Depends
from fastapi.encoders import jsonable_encoder
from typing import Any, Union, List
from pydantic import BaseModel, SecretStr, validator, Field
from ..db import db_instance
from ..db.db_instance import get_cursor, get_db_conn
from fastapi.responses import JSONResponse
from mysql.connector import Error
from ..auth_handler import signJWT
from ..auth_bearer import JWTBearer

router = APIRouter()

class Credential(BaseModel):
    netid: str
    password: SecretStr # Hides on display for frontend
    permission: int

class CredentialLogin(BaseModel):
    netid: str = Field(...)
    password: str = Field(...)

@router.get("/api/credentials",  dependencies=[Depends(JWTBearer())])
async def get_credentials():
    cursor = get_cursor()
    cursor.callproc("GetAllCredentials")
    credentials = []
    for result in cursor.stored_results():
        records = result.fetchall()
        for record in records:
            credentials.append(Credential(netid=record['netID'], password=record['password'], permission=record['permission']))
    return JSONResponse(content={"credentials": [jsonable_encoder(credential.dict()) for credential in credentials]})

@router.put("/api/credentials/{netid}",  dependencies=[Depends(JWTBearer())])
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
    print("This has been run")
    role = check_user(user)
    print("role: ", role)
    if role >= 0:
        if (role == 1): # if user is admin
            return signJWT(user.netid, True)
        else:
            return signJWT(user.netid, False)

# 0 = Student, 1 = Admin, -1 = Error
def check_user(data: CredentialLogin):
    curr_user = data
    print("currUser: ", curr_user)
    cursor = get_cursor()
    query = "SELECT * from Credentials WHERE netID = %s"
    params = (curr_user.netid,)
    cursor.execute(query, params)
    rows = cursor.fetchall()
    credentials = [Credential(netid=row['netID'], password=row['password'], permission=row['permission']) for row in rows]
    for user in credentials:
        if user.netid == curr_user.netid and user.password.get_secret_value() == curr_user.password:
            print("User success...")
            return user.permission
    return -1