import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CredentialsPage from "../pages/CredentialsPage";
import InventoryPage from "../pages/InventoryPage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";

//creative component import
import FloorPlanMapPage from "../pages/FloorPlanMapPage"

// DECLARE ROUTES HERE
const AuthenticationRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/credentials" element={<CredentialsPage/>}/>
                <Route path="/inventory" element={<InventoryPage/>}/>
                <Route path="/facilities" element={<CredentialsPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>

                {/* Creative Component Page */}
                <Route path="/floorplan" element={<FloorPlanMapPage/>}/>
            </Routes>
        </Router>
        
    );
}

export default AuthenticationRouter;

