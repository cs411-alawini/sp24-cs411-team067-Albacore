import React, { useEffect} from "react";
import TabularViewer from "../TabularViewerAdmin";
import { httpClient } from "../../infra";

const FacilityModule = () => {

    const headers = [
      {field: "location_id", headerName: "LocationID", editable: false, type: 'number'},
      {field: "bldg_name", headerName: "Building", editable: true, type: 'singleSelect',
        valueOptions: ['Sidney Lu', 'SCD', 'English Building','Music & Arts Library']},
      {field: "floor_section", headerName : "Floor/Section", editable: true},
      {field: "longitude", headerName: "Condition", editable: true, type: 'singleSelect',
      valueOptions: ['Excellent', 'Good', 'Poor']},
      {field: "bldg_name", headerName: "Building", editable: true, type: 'singleSelect',
         valueOptions: ['Sidney Lu', 'SCD', 'English Building','Music & Arts Library']}, // should query from facilities
      {field: "duration", headerName: "Duration", editable: true}
    ]
  
    const getRequest = () => {
      return httpClient
        .get("/facilities", {headers: {}})
    }

    useEffect(() => {
    }, []);

    return (
        <div>
          <TabularViewer title={"Facilities"} grabData={getRequest} tableHeaders={headers} uniqueIdentifier={"item_id"}/>
        </div>
    );
}
export default FacilityModule;