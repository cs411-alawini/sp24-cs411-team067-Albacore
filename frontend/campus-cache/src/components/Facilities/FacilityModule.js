import React, { useEffect} from "react";
import TabularViewer from "../Tables/TabularViewerAdmin";
import { httpClient } from "../../infra";

const FacilityModule = () => {

    const headers = [
      {field: "location_id", headerName: "LocationID",type: 'number'},
      {field: "bldg_name", headerName: "Building", type: 'singleSelect'},
      {field: "floor_section", headerName : "Floor/Section"},
      {field: "longitude", headerName: "Latitude", type: 'singleSelect'},
      {field: "latitude", headerName: "Latitude", type: "singleSelect"},
      {field: "MapURL", headerName: "MapURL"}
    ]
  
    const getRequest = () => {
      const jwtToken = localStorage.getItem("JWTToken");
      return httpClient
        .get("/facilities", {headers: {Authorization: "Bearer " + jwtToken}})
    }

    useEffect(() => {
    }, []);

    return (
        <TabularViewer title={"Facilities"} grabData={getRequest} tableHeaders={headers} uniqueIdentifier={"location_id"}/>
    );
}
export default FacilityModule;