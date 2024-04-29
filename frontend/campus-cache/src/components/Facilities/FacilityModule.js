import React, { useEffect, useState} from "react";
import { httpClient } from "../../infra";
import TabularViewerGeolocator from "../Tables/TabularViewerGeolocator";

const FacilityModule = () => {

  const headers = [
    {field: "bldg_name", headerName: "Building", type: 'singleSelect', minWidth: 175},
    {field: "floor_section", headerName : "Floor/Section", minWidth: 150},
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
        <TabularViewerGeolocator title={"Facilities"} grabData={getRequest} tableHeaders={headers} uniqueIdentifier={"location_id"}/>
    );
}
export default FacilityModule;