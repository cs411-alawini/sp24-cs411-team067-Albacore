from fastapi import APIRouter, Depends, HTTPException
from typing import Any, Union, List, Optional
from pydantic import BaseModel
from ..db import db_instance
from ..db.db_instance import get_cursor, ResultSets
from fastapi.responses import JSONResponse
from ..auth.auth_bearer import JWTBearer, decodeJWT
from datetime import datetime

router = APIRouter()

class Reservations(BaseModel):
    reservation_id: int
    start_time: str
    return_time: Optional[str] = None
    deadline: Optional[str] = None
    netid: str
    item_id: int


@router.post("/api/reservations/{reservationid}", tags=["Reservations"], dependencies=[Depends(JWTBearer())])
async def create_reservation(reservationid: int, reservation: Reservations, token_payload: dict = Depends(JWTBearer())):    
    jwt_info = decodeJWT(token_payload)
    try:
        async with get_cursor() as cursor:
            # NOTE: Stored Procedure: create_reservation(StartTime, ReturnTime, Deadline, NetID, ItemID)
            reservation_id = reservation.reservation_id
            start_time = reservation.start_time
            return_time = reservation.return_time
            item_id = reservation.item_id
            deadline = datetime.strptime(reservation.deadline.strip("'\""), "%Y-%m-%d %H:%M:%S")
            netid = jwt_info['user_id']
            await cursor.callproc("create_reservation", (start_time, None, deadline, netid, item_id))
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
            print(len(all_reservations))
            return JSONResponse(content={"Reservations": [i.dict() for i in all_reservations]})

    except Exception as error:
        print("error occured: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for reservations")


@router.put("/api/admin/reservations/{reservationid}", tags=["Reservations", "Admin"], dependencies=[Depends(JWTBearer())])
async def update_reservations(reservationid: int, reservation: Reservations, token_payload: dict = Depends(JWTBearer())):
    # TODO: Require admin
    try:
        async with get_cursor() as cursor:
            # NOTE: Stored Procedure: update_reservation(ReservationID, StartTime, ReturnTime, Deadline, NetID)
            reservation_id = reservation.reservation_id
            start_time = reservation.start_time
            return_time = reservation.return_time
            deadline = datetime.strptime(reservation.deadline.strip("'\""), "%Y-%m-%d %H:%M:%S")
            netid = reservation.netid

            await cursor.callproc("update_reservation", (reservation_id, start_time, return_time, deadline, netid))
            await cursor.connection.commit()
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

# @router.put("/api/admin/reservations", tags=["Reservations"], dependencies=[Depends(JWTBearer())])
# async def admin_update_reservations(): # Special Admin Privileges reservations
#     pass

@router.delete("/api/reservations/{reservationid}", tags=["Reservations"], dependencies=[Depends(JWTBearer())])
async def remove_reservations():
    pass

