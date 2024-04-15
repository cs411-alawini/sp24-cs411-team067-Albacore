import React, { useContext } from "react";
// Created separate directory to prevent circular dependency
import CredentialsModule from "../components/User/CredentialsModule";
import LoginBar from "../components/NavBar";
import FileUploadButton from "../components/FileUploadButton";
import { Divider } from "@mui/material";
import { AppContext } from "../App";
import UnauthorizedPage from "./UnauthorizedPage";
const CredentialsPage = () => {
    const context = useContext(AppContext);
    
    return (
        <>
            <LoginBar/>
            <Divider/>
            {context.state.isAdmin ? <CredentialsModule/> : <UnauthorizedPage/>}
            
        </>
    );
};

export default CredentialsPage;