import React from "react";
import LoginBar from "../components/NavBar";
import ReservationModule from "../components/Reservations/ReservationModule";
import { Typography } from "@mui/material";
// Created separate directory to prevent circular dependency

const ReservationsPage = () => {
    
    return (
        <>
            <LoginBar/>
            <Typography variant="h5" color="primary" fontSize={30}>
                {"Reservations"}
                </Typography>
            <ReservationModule/>
        </>
    );
};

export default ReservationsPage;