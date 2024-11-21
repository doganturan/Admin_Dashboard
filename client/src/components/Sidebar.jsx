import React, { useEffect, useState } from 'react'
import { Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme } from "@mui/material"
import {
    SettingsOutlined, ChevronLeft, ChevronRightOutlined, HomeOutlined, ShoppingCartOutlined,
    Groups2Outlined, ReceiptLongOutlined, PublicOutlined, PointOfSaleOutlined, TodayOutlined,
    CalendarMonthOutlined, AdminPanelSettingsOutlined, TrendingUpOutlined, PieChartOutlineOutlined,
    PieChartOutlined
} from '@mui/icons-material'
import { useLocation, useNavigate } from 'react-router-dom'
import FlexBetween from './FlexBetween'
import profileImage from 'assets/profile.jpg'

const navItems = [
    {
        text: "Overview",
        icon: null
    },
    {
        text: "Dashboard",
        icon: <HomeOutlined />
    },
    {
        text: "Client Facing",
        icon: null
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />
    },
    {
        text: "Customers",
        icon: <Groups2Outlined />
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined />
    },
    {
        text: "Geography",
        icon: <PublicOutlined />
    },
    {
        text: "Sales",
        icon: null
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />
    },
    {
        text: "Daily",
        icon: <TodayOutlined />
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />
    },
    {
        text: "Breakdown",
        icon: <PieChartOutlined />
    },
    {
        text: "Management",
        icon: null
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined />
    },
]

const Sidebar = ({ drawerWidth, isSidebarOpen, setIsSidebarOpen, isNonMobile, user }) => {

    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        setActive(pathname.substring(1))
    }, [pathname])

    return (
        <Box component="nav">
            {isSidebarOpen && (
                <Drawer open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} variant='persistent' anchor='left' sx={{
                    width: drawerWidth,
                    "& .MuiDrawer-paper": {
                        color: theme.palette.secondary[200],
                        backgroundColor: theme.palette.background.alt,
                        boxSizing: "border-box",
                        borderWidth: isNonMobile ? 0 : "2px",
                        width: drawerWidth
                    }
                }}>
                    <Box width="100%">
                        <Box m='1rem'>
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display="flex" alignItems="center" justifyContent='center' flexDirection='column' gap="0.5rem">
                                    <Box position="" bottom="">
                                        <FlexBetween textTransform="none" gap="1rem" m="1rem">
                                            <Box component="img" alt='profile' src={profileImage} height='40px' width='40px' borderRadius='50%' sx={{ objectFit: "cover" }} />
                                            <Box textAlign='left'>
                                                <Typography fontWeight='bold' fontSize='1rem' sx={{ color: theme.palette.secondary[100] }}>
                                                    {user.name}
                                                </Typography>
                                                <Typography fontWeight='thin' fontSize='0.8rem' sx={{ color: theme.palette.secondary[50] }}>
                                                    {user.occupation}
                                                </Typography>
                                            </Box>
                                            <SettingsOutlined sx={{ color: theme.palette.secondary[300], fontSize: '25px' }} />
                                        </FlexBetween>
                                    </Box>
                                </Box>
                                {!isNonMobile && (
                                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                                        <ChevronLeft />
                                    </IconButton>
                                )}
                            </FlexBetween>
                            <Divider />
                        </Box>
                        <List>
                            {navItems.map(({ text, icon }) => {
                                if (!icon) {
                                    return (

                                        <div className="">
                                            <Typography key={text} sx={{ m: "1rem 0 .5rem 2.5rem", fontSize: '1.1rem', fontWeight: '700' }}>
                                                {text}
                                            </Typography>
                                            <Divider />
                                        </div>


                                    )
                                }

                                const lcText = text.toLowerCase();
                                return (
                                    <ListItem key={text} disablePadding>
                                        <ListItemButton sx={{ backgroundColor: active === lcText ? theme.palette.secondary[300] : "transparent", color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[100] }} onClick={() => {
                                            navigate(`/${lcText}`);
                                            setActive(lcText);
                                        }}>
                                            <ListItemIcon sx={{ ml: '1.5rem', color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[200], minWidth: '33px' }}>
                                                {icon}
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && (
                                                <ChevronRightOutlined sx={{ ml: 'auto' }} />
                                            )}
                                        </ListItemButton>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Box>
                </Drawer>
            )}
        </Box>
    )
}

export default Sidebar