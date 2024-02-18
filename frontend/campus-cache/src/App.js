import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import AuthenticationRouter from "./components/AuthenticationRouter";

const App = () => {

  const HTTPCLIENT_BASE_URL = "http://localhost:8000/";

  // React Hook separated by getter + setter
  const [sampleMsg, setSampleMsg] = useState("START");

  // Axios is a simple http client library
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
        <p>
          Status here: {sampleMsg}
        </p>
        <button onClick={()=>getRequest()}>Click to make API Request here</button>
        <div>
          <AuthenticationRouter>
          </AuthenticationRouter>
        </div>
    </div>
  );
}

export default App;
