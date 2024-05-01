import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import BlockIcon from '@mui/icons-material/Block';
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import React, {useEffect} from "react";
import { httpClient } from "../../infra";

const ReturnButton = ({availability, setDialog, setItem, params}) => {
    const handleClick = () => {
        setItem(params.row.item_id)
        setDialog(true);
        const body = {};
        const jwtToken = localStorage.getItem("JWTToken");
        httpClient.put("/reservations/" + params.row.item_id, body,
            {headers: {Authorization: "Bearer " + jwtToken}}).then((response)=> {
               window.location.reload();
            })
        .catch((error) => {
            console.error("dialogue reserve item form error", error)
        })
    }
    useEffect(()=> {})
    return (!availability ? 
    <Button
        variant="contained" 
        color="primary"
        size="small"
        sx={{ fontSize: '0.50rem'}}
        onClick={()=>handleClick()}>
        Return
    </Button> : 
    <Button 
        disabled
        variant="contained" 
        color="error"
        size="small"
        sx={{ 
            fontSize: '0.50rem'
        }}>
        Return
  </Button>);
  
};

ReturnButton.propTypes = {
    availability: PropTypes.bool,
    setDialog: PropTypes.func,
    setItem: PropTypes.func
};

export default ReturnButton;