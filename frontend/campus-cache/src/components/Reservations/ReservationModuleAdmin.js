import React, { useEffect} from "react";
import { httpClient } from "../../infra";
import { TabularViewerAdmin } from "../Tables";
import moment from 'moment';

const ReservationModuleAdmin = () => {
    const headers = [
      {field: "reservation_id",  headerName: "ReservationID", type: 'counter', minWidth: 125},
      {field: "start_time", valueGetter: (value) => convertDate(value, "start_time"),  headerName: "StartTime",  type: "dateTime", minWidth: 165, editable: true},
      {field: "return_time", valueGetter: (value) => convertDate(value, "return_time"), headerName: "ReturnTime", type: "dateTime", minWidth: 175, editable: true},
      {field: "deadline", valueGetter: (value) => convertDate(value, "deadline"), headerName: "Deadline", type: "dateTime", minWidth: 175, editable: true},
      {field: "netid", headerName: "NetID",  minWidth: 125}
    ]

    const convertDate = (value, key) => {
        const temps = value["row"][key]
        try {
        const dateStr = new Date(moment(temps, 'YYYY-MM-DD HH:mm:ss'));
        return dateStr
        } catch (e) {
            console.error("datestr parse failed", e)
        }
    }

    const putRequest = (id, body) => { // Remember 'Put' is idempotent
        const jwtToken = localStorage.getItem("JWTToken");
        return httpClient
          .put("/admin/reservations/" + id , body, 
          {headers: {Authorization: "Bearer " + jwtToken}});
    } 
  
    const getRequest = () => {
      const jwtToken = localStorage.getItem("JWTToken");
      return httpClient
        .get("/reservations", {headers: {Authorization: "Bearer " + jwtToken}})
    }

    useEffect(() => {
    }, []);

    return (
        <TabularViewerAdmin title={"Reservations"} grabData={getRequest} updateData={putRequest} tableHeaders={headers} uniqueIdentifier={"reservation_id"} deleteEnabled/>
    );
}
export default ReservationModuleAdmin;