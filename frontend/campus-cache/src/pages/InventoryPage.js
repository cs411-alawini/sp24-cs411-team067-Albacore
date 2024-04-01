import React,{useState,useEffect} from "react";
import LoginBar from "../components/NavBar";
import { jwtDecode } from "jwt-decode";
import InventoryModuleAdmin from "../components/Inventory/InventoryModuleAdmin";
// Created separate directory to prevent circular dependency

const InventoryPage = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    
    useEffect(() => {
        const checkToken = () => {
            // Add listener to change in localStorage 
            // see: https://stackoverflow.com/questions/61178240/useeffect-does-not-listen-for-localstorage 
            const JWTToken = localStorage.getItem("JWTToken");
            if (JWTToken) {
                const decodedToken = jwtDecode(JWTToken);
                if (decodedToken.role == "admin") {
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
    })
    
    return (
        <>
            <LoginBar/>
            {isAdmin ? <InventoryModuleAdmin/> : <InventoryModuleAdmin/>}
            
        </>
    );
};

export default InventoryPage;