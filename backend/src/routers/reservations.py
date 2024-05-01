from fastapi import APIRouter, Depends, HTTPException
from typing import Any, Union, List, Optional
from pydantic import BaseModel
from ..db import db_instance
from ..db.db_instance import get_cursor, ResultSets
from fastapi.responses import JSONResponse
from ..auth.auth_bearer import JWTBearer, decodeJWT
from datetime import datetime, timedelta

router = APIRouter()

class Reservations(BaseModel):
    reservation_id: int
    start_time: str
    return_time: Optional[str] = None
    deadline: Optional[str] = None
    netid: str
    item_id: int

class ReservationAdminCreate(BaseModel):
    reservation_id: int
    start_time: Optional[str] = None
    return_time: Optional[str] = None
    deadline: Optional[str] = None
    netid: Optional[str] = None
    item_id: Optional[int] = None

class BlankModel(BaseModel):
    itemid: Optional[int] = None


@router.post("/api/reservations/{itemid}", tags=["Reservations"], status_code=201, dependencies=[Depends(JWTBearer())])
async def create_reservation(itemid: int, reservation: BlankModel, token_payload: dict = Depends(JWTBearer())):    
    try:
        print("before")
        jwt_info = decodeJWT(token_payload)
        async with get_cursor() as cursor:
            # NOTE: Stored Procedure: create_reservation(StartTime, ReturnTime, NetID, ItemID)
            utc_now = datetime.utcnow()
            offset = timedelta(hours=6)  
            central_time = utc_now - offset
            start_time = central_time
            item_id = itemid
            netid = jwt_info['user_id']
            await cursor.callproc("create_reservation", (start_time, None, netid, item_id))
            await cursor.connection.commit()
    except Exception as error:
        print("error occured: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for updating reservations")

@router.get("/api/reservations", tags=["Reservations"], dependencies=[Depends(JWTBearer())])
async def get_reservations(token_payload: dict = Depends(JWTBearer())):
    jwt_info = decodeJWT(token_payload)
    try:
        async with get_cursor() as cursor:
            if (jwt_info['role'] == 'admin'):
                await cursor.callproc("GetAllReservations")
            else:
                await cursor.callproc("GetAllowedReservations", (jwt_info['user_id'],))
            results = []
            initial_results = await cursor.fetchall()
            results.append(initial_results)
            async for result_set in ResultSets(cursor):
                results.append(result_set)
            results = results[0]
            all_reservations = [Reservations(reservation_id=row['ReservationID'], start_time=row['StartTime'].strftime("%Y-%m-%d %H:%M:%S") ,return_time=row['ReturnTime'].strftime("%Y-%m-%d %H:%M:%S") if row['ReturnTime'] else None, deadline = row['Deadline'].strftime("%Y-%m-%d %H:%M:%S") if row['Deadline'] else None, netid=row['NetID'], item_id=row['ItemID']) for row in results]
            return JSONResponse(content={"Reservations": [i.dict() for i in all_reservations]})

    except Exception as error:
        print("error occured: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for reservations")

def convertDatetime(datestr):
    return datetime.fromisoformat(datestr.rstrip('Z')) - timedelta(hours=6)

@router.put("/api/admin/reservations/{reservationid}", tags=["Reservations", "Admin"], dependencies=[Depends(JWTBearer())])
async def update_reservations(reservationid: int, reservation: ReservationAdminCreate, token_payload: dict = Depends(JWTBearer())): # ADMIN UPDATE
    # TODO: Require admin
    jwt_info = decodeJWT(token_payload)
    print("reservation", convertDatetime(reservation.return_time))
    try:
        async with get_cursor() as cursor:
            
            # NOTE: Stored Procedure: update_reservation(ReservationID, StartTime, ReturnTime, Deadline, NetID)
            if (jwt_info['role'] == 'admin'):
                reservation_id = reservationid
                start_time = convertDatetime(reservation.start_time)
                return_time = convertDatetime(reservation.return_time)
                deadline = convertDatetime(reservation.deadline)
                netid = reservation.netid
                await cursor.callproc("update_reservation", (reservation_id, start_time, return_time, deadline, netid))
                await cursor.connection.commit()
            else:
                print("user isn't admin, not allowed to form this action")
                raise HTTPException(status_code=403, detail="not allowed to perform admin action")
    except Exception as error:
        print("error occured: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for updating reservations")

@router.put("/api/reservations/{reservationid}", tags=["Reservations"], dependencies=[Depends(JWTBearer())])
async def return_item(reservationid: int, reservation: Reservations, token_payload: dict = Depends(JWTBearer())):
    try:
        async with get_cursor() as cursor:
            """NOTE: Stored Procedure: user_return_item(ReservationID, NetID, ReturnTime)
            # will update the return time for a given reservationID and netID. 
            # This is for the user side when they return an item"""
            reservation_id = reservation.reservation_id
            return_time = reservation.return_time
            netid = reservation.netid
            await cursor.callproc("user_return_item", (reservation_id, netid, return_time))
            await cursor.connection.commit()
    except Exception as error:
        print("error occured: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for updating reservations")

@router.delete("/api/reservations/{reservationid}", tags=["Reservations"], dependencies=[Depends(JWTBearer())])
async def remove_reservations(reservationid: int, token_payload: dict = Depends(JWTBearer())):
    # stored procedure: delete_reservation(p_ReservationID)
    print("running")
    jwt_info = decodeJWT(token_payload)
    
    try:
        async with get_cursor() as cursor:
            if (jwt_info['role'] == 'admin'):
                await cursor.callproc("delete_reservation", (reservationid,))
                await cursor.connection.commit()
            else:
                print("user is not admin, not allowed to perform this action")
                raise HTTPException(status_code=403, detail="not allowed to perform admin action")
    except Exception as error:
        print("error occured ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for removing reservations")