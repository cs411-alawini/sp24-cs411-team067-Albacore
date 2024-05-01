import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {  Link as RouterLink  } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography, ListItemButton, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { AppContext } from '../App';
import HomeIcon from '@mui/icons-material/Home';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import DeskIcon from '@mui/icons-material/Desk';
import ComputerIcon from '@mui/icons-material/Computer';
import DomainIcon from '@mui/icons-material/Domain';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import MapIcon from '@mui/icons-material/Map';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const context = useContext(AppContext);

    const handleLogout = () => {
        localStorage.removeItem("JWTToken");
        window.location.href = "/"
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary">
                <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => setDrawerOpen(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h5" component="div" sx={{ flexGrow: 2, marginLeft: "200px"}}>
                    {context.state.isAdmin ? "Campus Cache - Administrator Mode" : "Campus Cache"}
                </Typography>
                
                {context.state.loggedIn ? 
                    <Button color="inherit" startIcon={<AccountBoxIcon/>} onClick={()=>window.location.href="/settings"}>
                        {context.state.user}
                    </Button>
                    : <div/>}
                <Typography>
                    {"|"}
                </Typography>
                <IconButton color="inherit" onClick={()=>window.location.href="/"}>
                    <HomeIcon/>
                </IconButton>
                <Typography>
                    {"|"}
                </Typography>
                {context.state.loggedIn ?
                    <Button color="inherit" onClick={()=>handleLogout()}>Logout</Button>
                    :<Button color="inherit" onClick={()=>window.location.href="/login"}>Login</Button>
                }
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List>
                    <ListItem onClick={()=>window.location.href="/inventory"}>
                        <ListItemButton>
                            <ListItemIcon>
                                <DeskIcon/>
                            </ListItemIcon>
                            Inventory  
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={()=>window.location.href="/facilities"}>
                        <ListItemButton>
                        <ListItemIcon>
                                <CorporateFareIcon/>
                            </ListItemIcon>
                            Facilities  
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={()=>window.location.href="/reservations"}>
                        <ListItemButton>
                            <ListItemIcon>
                                <EventSeatIcon/>
                            </ListItemIcon>
                            Reservations  
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={()=>window.location.href="/floorplan"}>
                        <ListItemButton>
                            <ListItemIcon>
                                <MapIcon/>
                            </ListItemIcon>
                            Grainger Computers  
                        </ListItemButton>
                    </ListItem>
                    {context.state.isAdmin? <>
                        <ListItem onClick={()=>window.location.href="/stats"}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <QueryStatsIcon/>
                                </ListItemIcon>
                                Admin Stats 
                            </ListItemButton>
                        </ListItem>
                        <ListItem onClick={()=>window.location.href="/credentials"}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <AccountBoxIcon/>
                                </ListItemIcon>
                                Credentials
                            </ListItemButton>
                        </ListItem>
                    </>:
                    <div/>}
                    
                </List>
        </Drawer>
        </Box>
  );
}

export default NavBar;