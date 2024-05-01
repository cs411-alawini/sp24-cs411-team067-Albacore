import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import BlockIcon from '@mui/icons-material/Block';
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import React, {useEffect} from "react";

const ReservationButton = ({availability, setDialog, setItem, params}) => {
    const handleClick = () => {
        setItem(params.row.item_id)
        setDialog(true);
    }
    useEffect(()=> {})
    return (availability ? 
    <Button
        variant="contained" 
        color="primary"
        size="small"
        sx={{ fontSize: '0.50rem'}}
        onClick={()=>handleClick()}
        endIcon={<AddCircleOutline/>}>
        Reserve
    </Button> : 
    <Button 
        disabled
        variant="contained" 
        color="error"
        size="small"
        sx={{ 
            fontSize: '0.50rem'
        }}
        endIcon={<AddCircleOutline/>}>
        Reserve
  </Button>);
  
};

ReservationButton.propTypes = {
    availability: PropTypes.bool,
    setDialog: PropTypes.func,
    setItem: PropTypes.func
};

export default ReservationButton;