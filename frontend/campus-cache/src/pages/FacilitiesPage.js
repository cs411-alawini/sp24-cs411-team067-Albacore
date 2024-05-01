import React, { useContext, useEffect } from "react";
import LoginBar from "../components/NavBar";
import { FacilityModule } from "../components/Facilities";
import { Typography } from "@mui/material";
import { AppContext } from "../App";
// Created separate directory to prevent circular dependency

const FacilitiesPage = () => {
    const context = useContext(AppContext);   
    useEffect(() => {
        if (!context.state.loggedIn) {
            window.location.href = "/unauthorized"
        }
    }, []);
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