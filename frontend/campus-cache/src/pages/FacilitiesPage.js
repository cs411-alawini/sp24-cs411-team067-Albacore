import React from "react";
import LoginBar from "../components/NavBar";
import { FacilityModule } from "../components/Facilities";
import { Typography } from "@mui/material";
// Created separate directory to prevent circular dependency

const FacilitiesPage = () => {
    
    return (
        <>
            <LoginBar/>
            <Typography variant="h5" color="primary" fontSize={30}>
                {"Facilities"}
            </Typography>
            <FacilityModule/>
        </>
    );
};

export default FacilitiesPage;