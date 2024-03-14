import React from "react";
// Created separate directory to prevent circular dependency
import CredentialsModule from "../components/User/CredentialsModule";
import LoginBar from "../components/LoginBar";
const CredentialsPage = () => {
    
    return (
        <>
             <LoginBar/>
            <CredentialsModule/>
        </>
    );
};

export default CredentialsPage;