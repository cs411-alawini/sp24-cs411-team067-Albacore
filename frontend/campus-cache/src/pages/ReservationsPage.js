import React from "react";
import LoginBar from "../components/NavBar";
import ReservationModule from "../components/Reservations/ReservationModule";
// Created separate directory to prevent circular dependency

const ReservationModule = () => {
    
    return (
        <>
            <LoginBar/>
            <ReservationModule/>
        </>
    );
};

export default ReservationModule;