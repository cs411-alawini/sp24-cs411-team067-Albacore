import React, { useContext, useEffect } from "react";
// Created separate directory to prevent circular dependency
import CredentialsModule from "../components/User/CredentialsModule";
import LoginBar from "../components/NavBar";
import FileUploadButton from "../components/FileUploadButton";
import { Divider } from "@mui/material";
import { AppContext } from "../App";
import UnauthorizedPage from "./UnauthorizedPage";
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
            <Divider/>
            <CredentialsModule/>
        </>
    );
};

export default CredentialsPage;