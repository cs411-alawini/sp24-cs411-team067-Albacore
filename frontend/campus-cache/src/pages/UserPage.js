import React from "react";
// Created separate directory to prevent circular dependency
import { UserModule } from "../components/User"; 
const UserPage = () => {
    return (
        <>
            <UserModule/>
        </>
    );
};

export default UserPage;