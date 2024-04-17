import React, { useContext } from "react";

import NavBar from "../components/NavBar";
import { AppContext } from "../App";

const LandingPage = () => {
    const context = useContext(AppContext);
    const getWelcomeString = () => {
        var welcomeStr = "Welcome, ";
        console.log("context: ")
        if (context.state.loggedIn) {
            if (context.state.isAdmin) {
                welcomeStr += ("Admin " + context.state.user + "!");
            } else {
                welcomeStr += ("User " + context.state.user + "!");
            }
            return welcomeStr;
        } else {
            window.location.href = "/login"
            return ""
        }
        
    }
    return (
        <>
            <NavBar/>
            <p>
                {getWelcomeString()}
            </p>
        </>
        
    )
}

export default LandingPage;