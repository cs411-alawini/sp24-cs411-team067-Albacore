import React from "react";
import { InventoryModule } from "../components/Inventory";
import LoginBar from "../components/LoginBar";
// Created separate directory to prevent circular dependency

const InventoryPage = () => {
    
    return (
        <>
            <LoginBar/>
            <InventoryModule/>
        </>
    );
};

export default InventoryPage;