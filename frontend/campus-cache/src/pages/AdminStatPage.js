import React from "react";
import { httpClient } from "../infra";
import { TabularViewerBase } from "../components/Tables";
import NavBar from "../components/NavBar";


const AdminStatPage = () => {
    const lateHeaders = [
        {field: "major_id", headerName: "MajorID"},
        {field: "major_name", headerName: "MajorName"},
        {field: "late_count", headerName: "Late Count", type: "counter"}
    ]

    const brokenHeaders = [
        {field: "bldg_name", headerName: "Building Name"},
        {field: "num_broken", headerName: "Number Broken", type: "counter"}
    ]

    const getRequest = () => {
        const jwtToken = localStorage.getItem("JWTToken");
        return httpClient
        .get("/admin/adminstats", {headers: {Authorization: "Bearer " + jwtToken}})
    }


    return (
        <>
            <NavBar/>
            <TabularViewerBase title={"LateCount"} grabData={getRequest} tableHeaders={lateHeaders} uniqueIdentifier={"major_name"} positionNotAbsolute/>
            <br/>
            <TabularViewerBase title={"BrokenStat"} grabData={getRequest} tableHeaders={brokenHeaders} uniqueIdentifier={"bldg_name"} positionNotAbsolute/>
        </>
    )
}

export default AdminStatPage;