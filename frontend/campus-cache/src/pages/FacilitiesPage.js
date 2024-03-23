import React from "react";
import LoginBar from "../components/NavBar";
import { FacilityModule } from "../components/Facilities";
// Created separate directory to prevent circular dependency

const FacilitiesPage = () => {
    
    return (
        <>
            <LoginBar/>
            <FacilityModule/>
        </>
    );
};

export default FacilitiesPage;