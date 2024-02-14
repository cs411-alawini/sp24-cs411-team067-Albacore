import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import axios from "axios";

const App = () => {

  const HTTPCLIENT_BASE_URL = "http://localhost:8000/";

  const [sampleMsg, setSampleMsg] = useState("START");

  const httpClient = axios.create({
    baseURL: HTTPCLIENT_BASE_URL,
  });

  httpClient.interceptors.response.use((response) => {
    return response;
  }, (error) => {
    return Promise.resolve({error});
  });

  const getRequest = () => {
    httpClient
      .get("/")
      .then((response) => {
        setSampleMsg(response.data);
      })
      .catch((error) => {
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Status here: {sampleMsg}
        </p>
        <button onClick={()=>getRequest()}>Click to make API Request here</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
