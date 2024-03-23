import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {  Link as RouterLink  } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
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
                <Typography variant="h6" component="div" sx={{ flexGrow: 2 }}>
                    Campus Cache
                </Typography>
                <Button color="inherit" onClick={()=>window.location.href="/login"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List>
                    <ListItem component={RouterLink} to="/credentials">
                        <ListItemText primary="Credentials" />
                    </ListItem>
                    <ListItem component={RouterLink} to="/facilities">
                        <ListItemText primary="Facilities" />
                    </ListItem>
                    <ListItem component={RouterLink} to="/inventory">
                        <ListItemText primary="Inventory" />
                    </ListItem>
                    <ListItem component={RouterLink} to="/computers">
                        <ListItemText primary="Computers" />
                    </ListItem>
                    <ListItem component={RouterLink} to="/departments">
                        <ListItemText primary="Departments" />
                    </ListItem>
                </List>
        </Drawer>
        </Box>
  );
}

export default NavBar;