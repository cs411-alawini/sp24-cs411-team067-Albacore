import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CredentialsPage from "../pages/CredentialsPage";
import InventoryPage from "../pages/InventoryPage";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import FacilitiesPage from "../pages/FacilitiesPage";
import ComputersPage from "../pages/ComputersPage";
import ReservationModule from "./Reservations/ReservationModuleBase";
import ReservationsPage from "../pages/ReservationsPage";

// DECLARE ROUTES HERE
const AuthenticationRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/reservations" element={<ReservationsPage/>}/>
                <Route path="/credentials" element={<CredentialsPage/>}/>
                <Route path="/inventory" element={<InventoryPage/>}/>
                <Route path="/facilities" element={<FacilitiesPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/unauthorized" element={<UnauthorizedPage/>}/>
                <Route path="/computers" element={<ComputersPage/>}/>
            </Routes>
        </Router>
        
    );
}

export default AuthenticationRouter;

