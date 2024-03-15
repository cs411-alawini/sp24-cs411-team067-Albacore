import React from "react";
// Created separate directory to prevent circular dependency
import CredentialsModule from "../components/User/CredentialsModule";
import LoginBar from "../components/NavBar";
import FileUploadButton from "../components/FileUploadButton";
import { Divider } from "@mui/material";
const CredentialsPage = () => {
    
    return (
        <>
            <LoginBar/>
            <Divider/>
            <div align="left">
            <FileUploadButton/>
                </div>
            <CredentialsModule/>
        </>
    );
};

export default CredentialsPage;