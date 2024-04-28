import React from "react";
import { styled } from '@mui/material/styles';

const ImageOutline = styled('span')(({ theme, outlineColor }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common[outlineColor],
}));

export default ImageOutline;