import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from "@mui/material";
import { httpClient } from "../../infra";
import PropTypes from "prop-types";

const DialogDeleteItemConfirm = ({dialogOpen, setDialogOpen, rowID, setOpenSnackbar}) => {
    // Also, utilized:  https://mui.com/material-ui/react-dialog/

    const handleClose = (event) => {
        setDialogOpen(false);
    };

    const handleSubmit = () => {
        const jwtToken = localStorage.getItem("JWTToken");
        const body = {}
        httpClient.delete("/reservations/" + rowID,
            {headers: {Authorization: "Bearer " + jwtToken}}).then((response)=> {
                setOpenSnackbar(true);
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
        <DialogTitle>Delete a Reservation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {"Please confirm delete of Item " + rowID}
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

DialogDeleteItemConfirm.propTypes = {
    dialogOpen: PropTypes.bool,
    setDialogOpen: PropTypes.func,
    rowID: PropTypes.number,
    setOpenSnackbar: PropTypes.func
}

export default DialogDeleteItemConfirm;