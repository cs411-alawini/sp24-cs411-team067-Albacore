import React, { useContext, useEffect } from "react";
import LoginBar from "../components/NavBar";
import ComputerModule from "../components/Computers/ComputerModule";
import { AppContext } from "../App";
// Created separate directory to prevent circular dependency

const ComputersPage = () => {
    const context = useContext(AppContext);   
    useEffect(() => {
        if (!context.state.loggedIn) {
            window.location.href = "/unauthorized"
        }
    }, []);
    return (
        <>
            <LoginBar/>
            <ComputerModule/>
        </>
    );
};

export default ComputersPage;