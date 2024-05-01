import React, {useEffect,useContext} from "react";
import LoginBar from "../components/NavBar";
import { AppContext } from "../App";
import { Typography } from "@mui/material";
import ReservationModuleAdmin from "../components/Reservations/ReservationModuleAdmin";
import ReservationModuleBase from "../components/Reservations/ReservationModuleBase";
// Created separate directory to prevent circular dependency

const ReservationsPage = () => {
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
                {"Reservations"}
            </Typography> 
            {context.state.isAdmin ? <ReservationModuleAdmin/> : <ReservationModuleBase/>}
        </>
    );
};

export default ReservationsPage;