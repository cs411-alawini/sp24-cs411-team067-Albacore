import React from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@mui/material/'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'

// Inspired by: https://gist.github.com/vaish567/861e88d0e7f13cb00ef88767cd2f8d0f

const Login = () => {
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
                <TextField label='Username' placeholder='Enter username' variant="outlined" fullWidth required/>
                <TextField label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
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