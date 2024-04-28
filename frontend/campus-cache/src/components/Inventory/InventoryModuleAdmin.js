import React, { useEffect} from "react";
import { httpClient } from "../../infra";
import TabularViewerAdmin from "../Tables/TabularViewerAdmin";
import { Typography } from "@mui/material";

const InventoryModuleAdmin = () => {

    const headers = [
      {field: "item_id", headerName: "ItemID", editable: false, type: 'number'},
      {field: "item_name", headerName: "ItemName", editable: true},
      {field: "availability", headerName : "Availability", editable: true, type: 'boolean'},
      {field: "condition", headerName: "Condition", editable: true, type: 'singleSelect',
      valueOptions: ['Excellent', 'Good', 'Poor']},
      {field: "bldg_name", headerName: "Building", editable: true, type: 'singleSelect',
      valueOptions: ['Sidney Lu', 'SCD', 'English Building','Music & Arts Library']}, // should query from facilities
      {field: "duration", headerName: "Duration (Hrs)", editable: true, type: 'number'}
    ]
  
    const getRequest = () => {
      const jwtToken = localStorage.getItem("JWTToken");
      return httpClient
        .get("/inventory",{headers: {Authorization: "Bearer " + jwtToken}})
    }

    const putRequest = (id, body) => { // Remember 'Put' is idempotent
      const jwtToken = localStorage.getItem("JWTToken");
      return httpClient
        .put("/admin/inventory/" + id , body, {headers: {Authorization: "Bearer " + jwtToken}});
    }

    useEffect(() => {
    }, []);

    return (
        <div>
          <TabularViewerAdmin title={"Inventory"} grabData={getRequest} updateData={putRequest} tableHeaders={headers} uniqueIdentifier={"item_id"}/>
        </div>
    );
}
export default InventoryModuleAdmin;