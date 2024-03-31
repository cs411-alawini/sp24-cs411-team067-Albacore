import React, { useEffect} from "react";
import TabularViewer from "../TabularViewer";
import { httpClient } from "../../infra";

const InventoryModule = () => {

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

    useEffect(() => {
    }, []);

    return (
        <div>
          <TabularViewer title={"Inventory"} grabData={getRequest} tableHeaders={headers} uniqueIdentifier={"item_id"}/>
        </div>
    );
}
export default InventoryModule;