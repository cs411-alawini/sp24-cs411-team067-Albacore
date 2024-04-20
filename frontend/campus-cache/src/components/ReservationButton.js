import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import BlockIcon from '@mui/icons-material/Block';
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import React, {useState, useEffect, useMemo} from "react";

const ReservationButton = ({params, params2}) => {
    useEffect(()=> {})
    return (params ? 
    <Button 
        variant="contained" 
        color="primary"
        size="small"
        sx={{ fontSize: '0.50rem'}}
        startIcon={<AddCircleOutline/>}>
        Reserve
    </Button> : 
    <Button 
        variant="contained" 
        color="primary"
        size="small"
        sx={{ 
            fontSize: '0.50rem', 
            backgroundColor: 'red', '&:hover': {
            backgroundColor: 'darkred'
        }}}
        startIcon={<BlockIcon/>}>
        Reserved
  </Button>);
  
};

ReservationButton.propTypes = {
    params: PropTypes.bool
};

export default ReservationButton;