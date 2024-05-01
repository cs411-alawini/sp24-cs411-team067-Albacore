from fastapi import APIRouter, HTTPException, Body, Depends
from fastapi.encoders import jsonable_encoder
from typing import Any, Union, List, Optional
from pydantic import BaseModel, SecretStr, validator, Field
from ..db.db_instance import get_cursor, get_db_conn, ResultSets
from fastapi.responses import JSONResponse
from mysql.connector import Error
from ..auth.auth_handler import signJWT, decodeJWT
from ..auth.auth_bearer import JWTBearer

router = APIRouter()

class Credential(BaseModel):
    netid: str
    password: SecretStr # Hides on display for frontend
    permission: int

class CredentialLogin(BaseModel):
    netid: str = Field(...)
    password: str = Field(...)

class Major(BaseModel):
    majorid: int
    label: str # Major Name

class CredentialCreate(BaseModel):
    netid: str
    password: str
    permission: int
    majorid: Optional[int] = None
    majorid2: Optional[int] = None
    majorid3: Optional[int] = None

@router.get("/api/majors", dependencies=[Depends(JWTBearer)], tags=["Majors"])
async def get_majors(token_payload: dict = Depends(JWTBearer())):
    try:
        async with get_cursor() as cursor:
            query = "SELECT * FROM Majors"
            await cursor.execute(query,)
            rows = await cursor.fetchall()
            majors = [Major(majorid=row["MajorID"], label=row["MajorName"]) for row in rows]
            return JSONResponse(content={"Majors": [major.dict() for major in majors]})

    except Exception as error:
        print("error occurred: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute query for majors")

@router.post("/api/admin/credentials",  dependencies=[Depends(JWTBearer())], tags=["Credentials"])
async def create_credentials(user: CredentialCreate, token_payload: dict = Depends(JWTBearer())):
    print("user credential:", user)
    try:
        token = decodeJWT(token_payload)
        if (token["role"] != "admin"):
            raise HTTPException(status_code=401, detail="User is not authorized to perform this action")
        netid = user.netid
        password = user.password
        permission = True if (user.permission == 1) else False
        majorid1 = user.majorid if user.majorid else -1
        majorid2 = user.majorid2 if user.majorid2 else -1
        majorid3 = user.majorid3 if user.majorid3 else -1
        async with get_cursor() as cursor:
            await cursor.callproc("CreateUser", (netid, password, permission, majorid1, majorid2, majorid3))
            await cursor.connection.commit()
            return {"response": "success"}
    except Exception as error:
        print("error occurred: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for Credentials")
    
@router.get("/api/credentials",  dependencies=[Depends(JWTBearer())], tags=["Credentials"])
async def get_credentials(token_payload: dict = Depends(JWTBearer())):
    try:
        async with get_cursor() as cursor:
            token = decodeJWT(token_payload)
            if (token["role"] != "admin"):
                raise HTTPException(status_code=401, detail="User is not authorized to perform this action")
            await cursor.callproc("GetAllCredentials")
            results = []
            initial_results = await cursor.fetchall() # Async connector does not have stored results
            results.append(initial_results)
            async for result_set in ResultSets(cursor):
                results.append(result_set)
            results = results[0]
            all_credentials = [Credential(netid=row['netID'], password=row['password'], permission=row['permission']) for row in results]
            return JSONResponse(content={"credentials": [jsonable_encoder(credential.dict()) for credential in all_credentials]})
    except Exception as error:
        print("error occurred: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for Credentials")

@router.put("/api/admin/credentials/{netid}",  dependencies=[Depends(JWTBearer())], tags=["Credentials"])
async def update_credential( user: Credential, token_payload: dict = Depends(JWTBearer())):
    try:
        async with get_cursor() as cursor:
            await cursor.callproc("UpdateCredential", (user.netid, user.password, user.permission))
    except Exception as error:
        print("error occured: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for Credentials")

@router.post("/api/user/login", tags=["Login"])
async def user_login(user: CredentialLogin = Body(...)):
    role = await check_user(user)
    if role >= 0:
        if (role == 1): # if user is admin
            return signJWT(user.netid, True)
        else:
            return signJWT(user.netid, False)
    else:
        raise HTTPException(status_code=401, detail="Failed to login user")

# 0 = Student, 1 = Admin, -1 = Error
async def check_user(data: CredentialLogin):
    curr_user = data
    async with get_cursor() as cursor:
        query = "SELECT * FROM Credentials WHERE netID = %s"
        params = (curr_user.netid,)
        await cursor.execute(query, params)
        row = await cursor.fetchone()
        credential = Credential(netid=row['netID'], password=row['password'], permission=row['permission'])
        if credential.netid == curr_user.netid and credential.password.get_secret_value() == curr_user.password:
            return credential.permission
        return -1