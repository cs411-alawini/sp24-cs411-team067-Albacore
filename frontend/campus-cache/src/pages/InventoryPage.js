import React,{useState,useEffect,useContext} from "react";
import LoginBar from "../components/NavBar";
import { jwtDecode } from "jwt-decode";
import InventoryModuleAdmin from "../components/Inventory/InventoryModuleAdmin";
import InventoryModuleBase from "../components/Inventory/InventoryModuleBase";
import { AppContext } from "../App";
import { Box, Container, Typography } from "@mui/material";
// Created separate directory to prevent circular dependency

const InventoryPage = () => {
    const context = useContext(AppContext);   
    useEffect(() => {
        if (!context.state.loggedIn) {
            window.location.href = "/unauthorized"
        }
      }, []);
    return (
        <>
            <LoginBar/>
            <Typography variant="h5" color="primary" fontSize={30}>
                {"Inventory"}
            </Typography>
            {context.state.isAdmin ? <InventoryModuleAdmin/> : <InventoryModuleBase/>}
        </>
    );
};

export default InventoryPage;