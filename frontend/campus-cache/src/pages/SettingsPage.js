import { Divider, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import React, {useEffect, useState} from "react";
import NavBar from "../components/NavBar";

const SettingsPage = () => {
    const [alignment, setAlignment] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme")  : "light");

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        localStorage.setItem("theme", newAlignment)
        window.location.href="/settings";

    };
    return (
        <>
            <NavBar/>
            <Typography variant="h5" color="primary" fontSize={30}>
                {"Settings"}
            </Typography>
            <Divider/>
            <Typography>Theme</Typography>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform">
                <ToggleButton value="dark">Dark Mode</ToggleButton>
                <ToggleButton value="light">Light Mode</ToggleButton>
            </ToggleButtonGroup>
        </>
    )
}

export default SettingsPage;