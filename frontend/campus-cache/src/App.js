import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import AuthenticationRouter from "./components/AuthenticationRouter";

const App = () => {

  return (
    <div className="App">
        {/* <button onClick={()=>getRequest()}>Click to make API Request here</button> */}
        <div>
          <AuthenticationRouter>
          </AuthenticationRouter>
        </div>
    </div>
  );
}

export default App;
