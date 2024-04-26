import React, { useEffect, useState, useContext, useReducer } from "react";
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import AuthenticationRouter from "./components/AuthenticationRouter";
import { jwtDecode } from "jwt-decode";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const initialState = {
  loggedIn: false,
  isAdmin: false,
  user: ""
}
const finalState = {
  loggedIn: true,
  isAdmin: true,
  user: "nla3"
}

const getLoggedInState = () => {
  var userIsAdmin = false;
  var userId = "";
  var userLoggedIn = false;
  const JWTToken = localStorage.getItem("JWTToken");
  if (JWTToken) {
    const decodedToken = jwtDecode(JWTToken);
    if (decodedToken) {
      userIsAdmin = (decodedToken.role === "admin");
      userId = decodedToken.user_id;
      userLoggedIn = true;
    }
  }
  return {
    isAdmin: userIsAdmin,
    user: userId,
    loggedIn: userLoggedIn
  }
}

export const AppContext = React.createContext({
  loggedIn: true,
  isAdmin: true,
  user: "nla3"
})

const App = () => {

  const [state, setState] = useState(getLoggedInState());

  useEffect(() => {
  })
  
  
    return (
      <div className="App">
            <ThemeProvider theme={darkTheme}>
            <CssBaseline />
              <AppContext.Provider value={{state}}>
                <AuthenticationRouter>
                </AuthenticationRouter>
              </AppContext.Provider>
            </ThemeProvider>
      </div>
    );
}

export default App;
