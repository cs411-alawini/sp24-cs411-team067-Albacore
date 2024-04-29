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

const today = dayjs();
const monthahead = dayjs().add(1, 'month');

const DialogueReserveItemForm = ({dialogOpen, setDialogOpen}) => {
    // Also, utilized:  https://mui.com/material-ui/react-dialog/
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

 

    const handleClose = (event) => {
        console.log(event);
        setDialogOpen(false)
    };

    return (
        <Dialog
        open={dialogOpen}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {},
        }}
      >
        <DialogTitle>Create a Reservation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Each user must be assigned a netid, password, and role.
          </DialogContentText>
          
          <FormControl required sx={{ m: 1, width: '25ch' }} variant="outlined" >
          <InputLabel htmlFor="outlined-adornment-password" >NetID</InputLabel>
            <OutlinedInput
                disabled
                value={"nla3"}
                id="outlined-adornment-password"
                type={'text'}
            />
          </FormControl>
          <br/>
          <FormControl required sx={{ m: 1, width: '25ch' }} variant="outlined" >
          <InputLabel htmlFor="outlined-adornment-password" >Item Name</InputLabel>
            <OutlinedInput
                disabled
                value={"3D Printer"}
                id="outlined-adornment-password"
                type={'text'}
            />
          </FormControl>
        <br/>
        <FormControl  required sx={{ m: 1, width: '25ch' }} variant="outlined" >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <DesktopDateTimePicker disablePast maxDate={monthahead}
               shouldDisableTime={(value, view) =>
                view === 'hours' && value.hour() > 20 || value.hour() < 6
              }
               />
            </LocalizationProvider>
        </FormControl>
          
          <Divider/>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>Cancel</Button>
          <Button type="submit" >Create User</Button>
        </DialogActions>
      </Dialog>
    )
}

DialogueReserveItemForm.propTypes = {
    dialogOpen: PropTypes.bool,
    setDialogOpen: PropTypes.func
}

export default DialogueReserveItemForm;