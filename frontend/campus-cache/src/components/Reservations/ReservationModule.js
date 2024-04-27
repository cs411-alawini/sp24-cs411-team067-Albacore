import React, { useEffect} from "react";
import TabularViewer from "../Tables/TabularViewerAdmin";
import { httpClient } from "../../infra";

const ReservationModule = () => {

    const headers = [
      {field: "location_id", headerName: "LocationID",type: 'number'},
      {field: "bldg_name", headerName: "Building", type: 'singleSelect'},
    ]
  
    const getRequest = () => {
      const jwtToken = localStorage.getItem("JWTToken");
      return httpClient
        .get("/reservations", {headers: {Authorization: "Bearer " + jwtToken}})
    }

    useEffect(() => {
    }, []);

    return (
        <TabularViewer title={"Reservations"} grabData={getRequest} tableHeaders={headers} uniqueIdentifier={"location_id"}/>
    );
}
export default ReservationModule;