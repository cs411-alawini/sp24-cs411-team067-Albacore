import React from "react";
import LoginBar from "../components/NavBar";
import ComputerModule from "../components/Computers/ComputerModule";
// Created separate directory to prevent circular dependency

const ComputersPage = () => {
    
    return (
        <>
            <LoginBar/>
            <ComputerModule/>
        </>
    );
};

export default ComputersPage;