import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import PropTypes from "prop-types";
import React, {useState, useEffect} from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { httpClient } from "../../infra";

const DialogCredentialForm = ({dialogOpen, setDialogOpen}) => {
    // Utilized: https://mui.com/material-ui/react-text-field/ for password
    // Also, utilized:  https://mui.com/material-ui/react-dialog/
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [netID, setNetID] = useState("");
    const [majors, setMajors] = useState([])
    const [majorID, setMajorID] = useState(-1);
    const [majorID2, setMajorID2] = useState(-1);
    const [majorID3, setMajorID3] = useState(-1);
    const [role, setRole] = useState("")
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const getMajors = () => {
      const jwtToken = localStorage.getItem("JWTToken");
      return httpClient
        .get("/majors", {headers: {Authorization: "Bearer " + jwtToken}})
        .then((response) => {
          setMajors(response.data["Majors"])
        }).catch((error)=> {})
    }

    const createUserRequest = () => {
      const jwtToken = localStorage.getItem("JWTToken");
      const body = {};
      body["netid"] = netID;
      body["password"] = password;
      body["permission"] = (role == "Admin") ? 1 : 0;
      body["majorid"] = majorID;
      body["majorid2"] = majorID2;
      body["majorid3"] = majorID3;
      return httpClient
        .post("/admin/credentials", body, {headers: {Authorization: "Bearer " + jwtToken}})
        .then((response) => {
          window.location.reload(); 
      }).catch((error)=> {})
    }

    const handleSelectRole = (e) => {
        setRole(e.target.value)
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClose = (event) => {
        setDialogOpen(false)
    };

    useEffect(()=> {
      getMajors()
    }, [])

    return (
        <Dialog
        open={dialogOpen}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            setDialogOpen(false);
            createUserRequest();
          },
        }}
      >
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Each user must be assigned a netid, password, and role.
          </DialogContentText>
          
          <FormControl required sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">NetID</InputLabel>
            <OutlinedInput
                onChange={(e)=>{setNetID(e.target.value)}}
                id="outlined-adornment-password"
                type={'text'}
                label="NetID"
            />
          </FormControl>
          <Divider/>
          <FormControl required sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                onChange={(e)=>setPassword(e.target.value)}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
                }
                label="Password"
            />
          </FormControl>
          <Divider/>
          <FormControl required sx={{ m: 1, width: '25ch' }} >
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select label="isAdmin" labelId="demo-simple-select-label" 
                    id="demo-simple-select" value={role} onChange={handleSelectRole}>
                    <MenuItem value={"Admin"}>Admin</MenuItem>
                    <MenuItem value={"Student"}>Student</MenuItem>
                </Select>
          </FormControl>
          <Divider/>
          {(role === "Student") ? <>
            <FormControl required sx={{ m: 1, width: '25ch' }}>
              <Autocomplete
                onChange={(e, val)=>{setMajorID(val["majorid"])}}
                disablePortal
                id="combo-box-demo"
                options={majors}
                renderInput={(params) => <TextField {...params} label="Major #1" />}
              />
            </FormControl>
            <Divider/>
            <FormControl required sx={{ m: 1, width: '25ch' }}>
              <Autocomplete
                onChange={(e, val)=>{setMajorID2(val["majorid"])}}
                disablePortal
                id="combo-box-demo"
                options={majors}
                renderInput={(params) => <TextField {...params} label="Major #2" />}
              />
            </FormControl>
            <Divider/>
            <FormControl required sx={{ m: 1, width: '25ch' }}>
              <Autocomplete
                onChange={(e, val)=>{setMajorID3(val["majorid"])}}
                disablePortal
                id="combo-box-demo"
                options={majors}
                
                renderInput={(params) => <TextField {...params} label="Major #3" />}
              />
            </FormControl>
          </>:<div/>}
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={(e)=>handleClose(e)}>Cancel</Button>
          <Button type="submit" >Create User</Button>
        </DialogActions>
      </Dialog>
    )
}

DialogCredentialForm.propTypes = {
    dialogOpen: PropTypes.bool,
    setDialogOpen: PropTypes.func
}

export default DialogCredentialForm;