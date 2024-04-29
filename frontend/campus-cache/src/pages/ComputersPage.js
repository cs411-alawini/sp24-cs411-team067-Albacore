import React from "react";
import LoginBar from "../components/NavBar";
import FloorPlanMapModule from "../components/Computers/FloorPlanMapModule";
// Created separate directory to prevent circular dependency

const ComputerPage = () => {
    
    return (
        <>
            <LoginBar/>
            <ParentModule/>
        </>
    );
};

export default ComputerPage;