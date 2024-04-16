import React,{useState, useContext, useEffect} from 'react'
import {Grid,Paper,Avatar,TextField,Button,Typography,Link} from '@mui/material/'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'
import { httpClient } from "../infra";
import { AppContext} from '../App';
// Inspired by: https://gist.github.com/vaish567/861e88d0e7f13cb00ef88767cd2f8d0f

const Login = () => {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const {state, dispatch} = useContext(AppContext);

    const handleUsernameField = (event) => {
        setUsernameInput(event.target.value);
    };

    const handlePasswordField = (event) => {
        setPasswordInput(event.target.value);
    }

    useEffect(() => {
        if (localStorage.getItem("JWTToken") !== null) {
            window.location.href = "/";
        }
    })
    
    const userSignIn = (event) => {
        const body = {
            "netid": usernameInput,
            "password": passwordInput 
        }
        if (localStorage.getItem("JWTToken") === null) {
            httpClient.post("/user/login", body).then((response) => {
                const jwtToken = response["data"]["access_token"];
                console.log("JWT response: ", jwtToken);
                localStorage.setItem("JWTToken", jwtToken);
                window.location.href = "/";
            })
            .catch((error) => {
                console.log("Some error occurred")
            });
        } else {
            console.log("User already logged in...")
            window.location.href = "/";
        }
    }

    const paperStyle={padding :20,height:'70vh',width:350, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#587ca7'}
    const btnstyle={margin:'8px 0'}
    return(
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                <TextField label='Username' onChange={handleUsernameField} placeholder='Enter username' variant="outlined" fullWidth required/>
                <TextField label='Password' onChange={handlePasswordField} placeholder='Enter password' type='password' variant="outlined" fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button onClick={userSignIn} type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="#" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login