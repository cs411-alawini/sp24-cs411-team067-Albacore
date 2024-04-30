import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import PropTypes from "prop-types";
import dayjs from 'dayjs';
import React, {useState, useEffect} from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDateTimePicker } from '@mui/x-date-pickers/DesktopDateTimePicker';
import { httpClient } from "../../infra";
import moment from "moment";

const DialogueReserveItemForm = ({dialogOpen, setDialogOpen, rowID}) => {
    // Also, utilized:  https://mui.com/material-ui/react-dialog/

    const handleClose = (event) => {
        console.log(event);
        setDialogOpen(false);
    };

    const handleSubmit = () => {
        const jwtToken = localStorage.getItem("JWTToken");
        console.log("type rowid", typeof(rowID))
        httpClient.post("/reservations/" + rowID,
        {headers: {Authorization: "Bearer " + jwtToken}}).then((response)=> {

        })
        .catch((error) => {
            console.error("dialogue reserve item form error", error)
        })
    }

    return (
        <Dialog
        open={dialogOpen}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {handleSubmit()},
        }}
      >
        <DialogTitle>Create a Reservation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please confirm this action
          </DialogContentText>
        
          <Divider/>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>Cancel</Button>
          <Button type="submit" >Confirm</Button>
        </DialogActions>
      </Dialog>
    )
}

DialogueReserveItemForm.propTypes = {
    dialogOpen: PropTypes.bool,
    setDialogOpen: PropTypes.func,
    rowID: PropTypes.number
}

export default DialogueReserveItemForm;