import React,{useState,useEffect} from "react";
import LoginBar from "../components/NavBar";
import { jwtDecode } from "jwt-decode";
import InventoryModuleAdmin from "../components/Inventory/InventoryModuleAdmin";
import InventoryModuleBase from "../components/Inventory/InventoryModuleBase";
// Created separate directory to prevent circular dependency

const InventoryPage = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    
    useEffect(() => {
        function checkToken() {
            // Add listener to change in localStorage 
            // see: https://stackoverflow.com/questions/61178240/useeffect-does-not-listen-for-localstorage 
            const JWTToken = localStorage.getItem("JWTToken");
            if (JWTToken) {
                const decodedToken = jwtDecode(JWTToken);
                console.log("decodedToken.role: " + decodedToken);
                if (decodedToken.role === "admin") {
                    setIsAdmin(true);
                } else {
                    setIsAdmin(false);
                }
            }
        }
        window.addEventListener('storage', checkToken);

        return () => {
            window.removeEventListener('storage', checkToken);
        }
    },[])
    
    return (
        <>
            <LoginBar/>
            {isAdmin ? <InventoryModuleAdmin/> : <InventoryModuleBase/>}
            
        </>
    );
};

export default InventoryPage;