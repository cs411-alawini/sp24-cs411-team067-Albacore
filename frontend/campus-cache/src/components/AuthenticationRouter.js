import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CredentialsPage from "../pages/CredentialsPage";

// DECLARE ROUTES HERE

const AuthenticationRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<p>Landing Page</p>}/>
                <Route path="/credentials" element={<CredentialsPage/>}/>
            </Routes>
        </Router>
        
    );
}

export default AuthenticationRouter;

