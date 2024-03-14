import React from "react";
// Created separate directory to prevent circular dependency
import CredentialsModule from "../components/User/CredentialsModule";
import LoginBar from "../components/LoginBar";
import FileUploadButton from "../components/FileUploadButton";
const CredentialsPage = () => {
    
    return (
        <>
            <LoginBar/>
            <br/>
            <FileUploadButton/>
            <CredentialsModule/>
        </>
    );
};

export default CredentialsPage;