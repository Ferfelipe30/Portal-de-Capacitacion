import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import {Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import HomeScreen from "./HomeScreen";

const drawerWidth = 240;

const AppLayout: React.FC = () => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        Menu
                    </Typography>
                </Toolbar>
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        <ListItemButton component={Link} to="/">
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}>
                <Toolbar />
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                </Routes>
            </Box>
        </Box>
    );
};

export default AppLayout;