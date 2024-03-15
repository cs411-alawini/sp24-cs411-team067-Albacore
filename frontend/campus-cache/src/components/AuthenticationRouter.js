import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CredentialsPage from "../pages/CredentialsPage";
import InventoryPage from "../pages/InventoryPage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";

// DECLARE ROUTES HERE

const AuthenticationRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/credentials" element={<CredentialsPage/>}/>
                <Route path="/inventory" element={<InventoryPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
            </Routes>
        </Router>
        
    );
}

export default AuthenticationRouter;

