import React, { useContext, useEffect} from "react";
import { httpClient } from "../../infra";
import { AppContext } from "../../App";
import TabularViewerUserReserve from "../Tables/TabularViewerUserReserve";
import { Box } from "@mui/material";

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
    {field: "duration", headerName: "Duration", editable: true, type: 'number', align: 'center', headerAlign: 'center'},
    {field:"AverageTime", headerName: "Average Rental Time"}
  ]

  const getRequest = () => {
    const jwtToken = localStorage.getItem("JWTToken");
    return httpClient
      .get("/inventory",{headers: {Authorization: "Bearer " + jwtToken}})
  }

  return (
      <TabularViewerUserReserve title={"Inventory"} grabData={getRequest} tableHeaders={headers} uniqueIdentifier={"item_id"}/>
  );
}
export default InventoryModuleBase;