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
const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const context = useContext(AppContext);

    const handleLogout = () => {
        localStorage.removeItem("JWTToken");
        window.location.href = "/"
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
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
                <Typography variant="h6" component="div" sx={{ flexGrow: 2, marginLeft: "200px"}}>
                    Campus Cache
                </Typography>
                
                {context.state.loggedIn ? <Button color="inherit">{context.state.user}</Button>: <div/>}
                <IconButton color="inherit">
                    <AccountBoxIcon />
                </IconButton>
                <IconButton color="inherit" onClick={()=>window.location.href="/"}>
                    <HomeIcon/>
                </IconButton>
                {context.state.loggedIn ?
                    <Button color="inherit" onClick={()=>handleLogout()}>Logout</Button>
                    :<Button color="inherit" onClick={()=>window.location.href="/login"}>Login</Button>
                }
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List>
                    <ListItem onClick={()=>window.location.href="/credentials"}>
                        <ListItemButton>
                            <ListItemIcon>
                                <AccountBoxIcon/>
                            </ListItemIcon>
                            Credentials
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
                    <ListItem onClick={()=>window.location.href="/inventory"}>
                        <ListItemButton>
                            <ListItemIcon>
                                <DeskIcon/>
                            </ListItemIcon>
                            Inventory  
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={()=>window.location.href="/computers"}>
                        <ListItemButton>
                            <ListItemIcon>
                                <ComputerIcon/>
                            </ListItemIcon>
                            Computers  
                        </ListItemButton>
                    </ListItem>
                    <ListItem onClick={()=>window.location.href="/departments"}>
                        <ListItemButton>
                            <ListItemIcon>
                                <DomainIcon/>
                            </ListItemIcon>
                            Departments 
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
                </List>
        </Drawer>
        </Box>
  );
}

export default NavBar;