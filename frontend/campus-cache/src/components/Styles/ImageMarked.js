import React from "react";
import { styled } from '@mui/material/styles';

const ImageMarked = styled('span')(({ theme}) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));



export default ImageMarked;