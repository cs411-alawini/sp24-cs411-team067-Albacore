from fastapi import APIRouter, Depends, HTTPException
from typing import Any, Union, List, Optional
from pydantic import BaseModel
from ..db import db_instance
from ..db.db_instance import get_cursor, ResultSets
from fastapi.responses import JSONResponse
from ..auth.auth_bearer import JWTBearer

from ..auth.auth_handler import decodeJWT
from datetime import datetime

router = APIRouter()

class Reservations(BaseModel):
    reservation_id: int
    start_time: str
    return_time: str
    deadline: Optional[str] = None
    netid: str
    item_id: int

@router.post("/api/reservations", tags=["Reservations"], dependencies=[Depends(JWTBearer())])
async def create_reservation():
    pass

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
            print(results[0]['Deadline'], type(results[0]['Deadline']), "DEADLINE")
            all_reservations = [Reservations(reservation_id=row['ReservationID'], start_time=row['StartTime'].strftime("%Y-%m-%d %H:%M:%S") ,return_time=row['ReturnTime'].strftime("%Y-%m-%d %H:%M:%S"), deadline = row['Deadline'].strftime("%Y-%m-%d %H:%M:%S") if row['Deadline'] else None, netid=row['NetID'], item_id=row['ItemID']) for row in results]
            print(all_reservations)
            print(len(all_reservations))
            return JSONResponse(content={"Reservations": [i.dict() for i in all_reservations]})

    except Exception as error:
        print("error occured: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for reservations")

    

@router.put("/api/reservations/{reservationid}", tags=["Reservations"], dependencies=[Depends(JWTBearer())])
async def update_reservations(reservationid: int, reservation: Reservations, token_payload: dict = Depends(JWTBearer())):
    try:
        async with get_cursor() as cursor:
            await cursor.callproc("UpdateReservation", (reservation.reservation_id, datetime.strptime(reservation.return_time, "%Y-%m-%d %H:%M:%S")))
            await cursor.connection.commit()
    except Exception as error:
        print("error occured: ", error)
        raise HTTPException(status_code=500, detail="Failed to execute stored procedure for updating reservations")

# @router.put("/api/admin/reservations", tags=["Reservations"], dependencies=[Depends(JWTBearer())])
# async def admin_update_reservations(): # Special Admin Privileges reservations
#     pass

@router.delete("/api/reservations/{reservationid}", tags=["Reservations"], dependencies=[Depends(JWTBearer())])
async def remove_resrevations():
    pass

