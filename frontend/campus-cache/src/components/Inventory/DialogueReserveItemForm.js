import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import PropTypes from "prop-types";
import React, {useState, useEffect} from "react";
import { httpClient } from "../../infra";

const DialogueReserveItemForm = ({dialogOpen, setDialogOpen, rowID}) => {
    // Also, utilized:  https://mui.com/material-ui/react-dialog/

    const handleClose = (event) => {
        console.log(event);
        setDialogOpen(false);
    };

    const handleSubmit = () => {
        const jwtToken = localStorage.getItem("JWTToken");
        const body = {}
        httpClient.post("/reservations/" + rowID, body,
            {headers: {Authorization: "Bearer " + jwtToken}}).then((response)=> {window.location.reload();})
        .catch((error) => {
            console.error("dialogue reserve item form error", error)
        })
    }

    return (
        <Dialog
        open={dialogOpen}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => { event.preventDefault(); handleSubmit()},
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