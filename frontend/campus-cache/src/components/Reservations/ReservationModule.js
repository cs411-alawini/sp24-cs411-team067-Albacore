import React, { useEffect} from "react";
import TabularViewerBase from "../Tables/TabularViewerBase";
import { httpClient } from "../../infra";

const ReservationModule = () => {

    const headers = [
      {field: "reservationid", headerName: "ReservationID", type: 'counter'},
      {field: "start_time", headerName: "StartTime", type: 'datefield'},
      {field: "return_time", headerName: "ReturnTime",type: 'datefield'},
      {field: "deadline", headerName: "Deadline", type: 'datefield'},
      {field: "netid", headerName: "NetID"}
    ]
  
    const getRequest = () => {
      const jwtToken = localStorage.getItem("JWTToken");
      return httpClient
        .get("/reservations", {headers: {Authorization: "Bearer " + jwtToken}})
    }

    useEffect(() => {
    }, []);

    return (
        <TabularViewerBase title={"Reservations"} grabData={getRequest} tableHeaders={headers} uniqueIdentifier={"location_id"}/>
    );
}
export default ReservationModule;