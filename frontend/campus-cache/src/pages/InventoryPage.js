import React,{useState,useEffect, useContext} from "react";
import LoginBar from "../components/NavBar";
import { jwtDecode } from "jwt-decode";
import InventoryModuleAdmin from "../components/Inventory/InventoryModuleAdmin";
import InventoryModuleBase from "../components/Inventory/InventoryModuleBase";
import { AppContext } from "../App";
import { Box, Container } from "@mui/material";
// Created separate directory to prevent circular dependency

const InventoryPage = () => {
    const context = useContext(AppContext);   
    useEffect(() => {
        if (!context.state.loggedIn) {
            console.log(context.state);
            window.location.href = "/unauthorized"
        }
      }, []);
    return (
        <>
            <LoginBar/>
            <Box display="flex" justifyContent="center" alignItems="center">
                <div style={{ height: 400, width: '100%' }}>
                    {context.state.isAdmin ? <InventoryModuleAdmin/> : <InventoryModuleBase/>}
                </div>
            </Box>
        </>
    );
};

export default InventoryPage;