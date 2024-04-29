import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import BlockIcon from '@mui/icons-material/Block';
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import React, {useEffect} from "react";

const ReservationButton = ({params, setDialog}) => {
    useEffect(()=> {})
    return (params ? 
    <Button 
        variant="contained" 
        color="primary"
        size="small"
        sx={{ fontSize: '0.50rem'}}
        onClick={setDialog}
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
    params: PropTypes.bool,
    setDialog: PropTypes.func
};

export default ReservationButton;