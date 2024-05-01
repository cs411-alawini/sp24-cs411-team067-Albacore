import React, { useContext } from "react";
import { styled } from '@mui/material/styles';
import NavBar from "../components/NavBar";
import { AppContext } from "../App";
import ButtonBase from '@mui/material/ButtonBase';
import { Box, Typography } from "@mui/material";

const handleClick = (route) => {
  window.location.href = route;
}

const images = [
    {
      url: 'https://burnham310.com/wp-content/uploads/2020/09/UIUC-Student-Union-1.jpg',
      title: 'Credentials',
      width: '33.33%',
      href: "/credentials"
    },
    {
      url: 'https://will.illinois.edu/images/uploads/Illini-Union-voting-2022-768x440.png',
      title: 'My Reservations',
      width: '33.33%',
      href: "/reservations"
    },
    {
        url: 'https://www.library.illinois.edu/friends/wp-content/uploads/2021/02/ReadingRoomPainted-1024x752.jpg',
        title: 'Facilities',
        width: '33.33%',
        href: "/facilities"
    },
    {
        url: 'https://techservices.illinois.edu/wp-content/uploads/2021/08/EnglishLab.jpg',
        title: 'Grainger Computers',
        width: '33.33%',
        href: "/floorplan"
    },
    {
        url: 'https://www.niss.org/sites/default/files/UIL-UCham.jpg',
        title: 'Admin Stats',
        width: '33.33%',
        href: "/stats"
    },
    {
        url: 'https://cdn1.lib.jmu.edu/wp-content/uploads/equipment-loans-700x467.jpg',
        title: 'Borrowable Inventory',
        width: '33.33%',
        href: "/inventory"
    }
  ];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 325,
    [theme.breakpoints.down('sm')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
      zIndex: 1,
      '& .MuiImageBackdrop-root': {
        opacity: 0.15,
      },
      '& .MuiImageMarked-root': {
        opacity: 0,
      },
      '& .MuiTypography-root': {
        border: '4px solid currentColor',
      },
    },
  }));
  
  const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  });
  
  const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  }));
  
  const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  }));

  const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  }));

const LandingPage = () => {
    const context = useContext(AppContext);
    const getWelcomeString = () => {
        var welcomeStr = "Welcome, ";
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
            <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                {images.map((image) => (
                    <ImageButton
                    focusRipple
                    key={image.title}
                    style={{
                        width: image.width,
                    }}
                    onClick={()=>handleClick(image.href)}
                    >
                    
                <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                <ImageBackdrop className="MuiImageBackdrop-root" />
                <Image>
                    <Typography
                    component="span"
                    variant="subtitle1"
                    color="inherit"
                    sx={{
                        position: 'relative',
                        p: 4,
                        pt: 2,
                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                    }}
                    >
                    {image.title}
                    <ImageMarked className="MuiImageMarked-root" />
                    </Typography>
                </Image>
                </ImageButton>
      ))}
    </Box>
        </>
        
    )
}

export default LandingPage;