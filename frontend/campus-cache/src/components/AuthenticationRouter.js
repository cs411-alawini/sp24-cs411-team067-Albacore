import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CredentialsPage from "../pages/CredentialsPage";
import LandingPage from "./LandingPage";
import InventoryPage from "../pages/InventoryPage";

// DECLARE ROUTES HERE

const AuthenticationRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/credentials" element={<CredentialsPage/>}/>
                <Route path="/inventory" element={<InventoryPage/>}/>
            </Routes>
        </Router>
        
    );
}

export default AuthenticationRouter;

