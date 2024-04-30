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
  
    const getRequest = () => {
      const jwtToken = localStorage.getItem("JWTToken");
      return httpClient
        .get("/reservations", {headers: {Authorization: "Bearer " + jwtToken}})
    }

    useEffect(() => {
        try {
            const temp = new Date(moment('2024-01-16 18:50:00', 'YYYY-MM-DD HH:mm:ss').toDate().toString());
            console.log("module type: ", typeof(temp))
            console.log("Moment stuff: ", temp)
            
        } catch (e) {
            console.error("Error occurred module admin: ", e)
        }
    }, []);

    return (
        <TabularViewerAdmin title={"Reservations"} grabData={getRequest} tableHeaders={headers} uniqueIdentifier={"reservation_id"}/>
    );
}
export default ReservationModuleAdmin;