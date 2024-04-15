import React, { useContext, useEffect} from "react";
import { httpClient } from "../../infra";
import TabularViewerBase from "../TabularViewerBase";
import { AppContext } from "../../App";

const InventoryModuleBase = () => {
  const context = useContext(AppContext);

  const headers = [
    {field: "item_id", headerName: "ItemID", editable: false, type: 'number'},
    {field: "item_name", headerName: "ItemName", editable: true},
    {field: "availability", headerName : "Availability", editable: true, type: 'boolean'},
    {field: "condition", headerName: "Condition", editable: true, type: 'singleSelect',
    valueOptions: ['Excellent', 'Good', 'Poor']},
    {field: "bldg_name", headerName: "Building", editable: true, type: 'singleSelect',
    valueOptions: ['Sidney Lu', 'SCD', 'English Building','Music & Arts Library']}, // should query from facilities
    {field: "duration", headerName: "Duration", editable: true, type: 'number', align: 'center', headerAlign: 'center'}
  ]

  const getRequest = () => {
    const jwtToken = localStorage.getItem("JWTToken");
    return httpClient
      .get("/inventory",{headers: {Authorization: "Bearer " + jwtToken}})
  }

  useEffect(() => {
    // console.log("userisAdmin: " + context.state.isAdmin);
  }, []);

  return (
      <div>
          <p>Student</p>
          <TabularViewerBase title={"Inventory"} grabData={getRequest} tableHeaders={headers} uniqueIdentifier={"item_id"}/>
      </div>
  );
}
export default InventoryModuleBase;