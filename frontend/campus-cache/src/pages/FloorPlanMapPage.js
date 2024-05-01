import React, { useContext, useEffect } from "react";
// Created separate directory to prevent circular dependency
import FloorPlanMapModule from "../components/Computers/FloorPlanMapModule";
// import FloorPlanMapModule from "../components/Computers/FloorPlanMapModule";
import LoginBar from "../components/NavBar";
// import FileUploadButton from "../components/FileUploadButton";
import { Divider } from "@mui/material";
import { AppContext } from "../App";
const FloorPlanMapPage = () => {
    const context = useContext(AppContext);  
    useEffect(() => {
        if (!context.state.loggedIn) {
            window.location.href = "/unauthorized"
        }
    }, []);
    return (
        <>
            <LoginBar/>
            <Divider/>
            <div align="left">
            <FloorPlanMapModule/>
                </div>
        </>
    );
};

export default FloorPlanMapPage;