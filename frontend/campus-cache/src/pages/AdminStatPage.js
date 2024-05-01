import React, { useContext, useEffect } from "react";
import { httpClient } from "../infra";
import { TabularViewerBase } from "../components/Tables";
import NavBar from "../components/NavBar";
import { Grid, Paper, styled } from "@mui/material";
import { AppContext } from "../App";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

const AdminStatPage = () => {
    const context = useContext(AppContext);

    const lateHeaders = [
        {field: "major_id", headerName: "MajorID", align: "center", headerAlign: "center", minWidth: 250},
        {field: "major_name", headerName: "MajorName", align: "center", headerAlign: "center",  minWidth: 250},
        {field: "late_count", headerName: "Late Count", type: "counter", align: "center", headerAlign: "center",  minWidth: 250}
    ]

    const brokenHeaders = [
        {field: "bldg_name", headerName: "Building Name", minWidth: 350, align: "center", headerAlign: "center"},
        {field: "num_broken", headerName: "Number Broken", type: "counter", align: "center", headerAlign: "center", minWidth: 350}
    ]

    const getRequest = () => {
        const jwtToken = localStorage.getItem("JWTToken");
        return httpClient
        .get("/admin/stats", {headers: {Authorization: "Bearer " + jwtToken}})
    }

    useEffect(()=> {
        if (!context.state.isAdmin) {
            window.location.href = "/unauthorized"
        }
    }, [])


    return (
        <>
            <NavBar/>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Item>
                        <TabularViewerBase title={"LateCount"} grabData={getRequest} tableHeaders={lateHeaders} uniqueIdentifier={"major_name"} positionNotAbsolute/>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <TabularViewerBase title={"BrokenStat"} grabData={getRequest} tableHeaders={brokenHeaders} uniqueIdentifier={"bldg_name"} positionNotAbsolute/>
                    </Item>
                </Grid>
            </Grid>
        </>
    )
}

export default AdminStatPage;