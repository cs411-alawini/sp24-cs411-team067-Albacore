import React, { useEffect} from "react";
import { httpClient } from "../../infra";
import { TabularViewerAdmin } from "../Tables";

const ReservationModuleAdmin = () => {

    const headers = [
      {field: "reservation_id", headerName: "ReservationID", type: 'counter', minWidth: 125},
      {field: "start_time", headerName: "StartTime", type: 'datefield', minWidth: 165},
      {field: "return_time", headerName: "ReturnTime",type: 'datefield', minWidth: 175},
      {field: "deadline", headerName: "Deadline", type: 'datefield', minWidth: 175},
      {field: "netid", headerName: "NetID",  minWidth: 125}
    ]
  
    const getRequest = () => {
      const jwtToken = localStorage.getItem("JWTToken");
      return httpClient
        .get("/reservations", {headers: {Authorization: "Bearer " + jwtToken}})
    }

    useEffect(() => {
    }, []);

    return (
        <TabularViewerAdmin title={"Reservations"} grabData={getRequest} tableHeaders={headers} uniqueIdentifier={"reservation_id"}/>
    );
}
export default ReservationModuleAdmin;