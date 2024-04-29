import React, { useContext, useEffect } from "react";
// Created separate directory to prevent circular dependency
import CredentialsModule from "../components/Credentials/CredentialsModule";
import LoginBar from "../components/NavBar";
import { Divider, Typography } from "@mui/material";
import { AppContext } from "../App";
const CredentialsPage = () => {
    const context = useContext(AppContext);

    useEffect(() => {
        if (!context.state.isAdmin) {
            window.location.href = "/unauthorized"
        }
      }, []);
      
    return (
        <>
            <LoginBar/>
            <Typography variant="h5" color="primary" fontSize={30}>
                {"Credentials"}
            </Typography>
            <CredentialsModule/>
        </>
    );
};

export default CredentialsPage;