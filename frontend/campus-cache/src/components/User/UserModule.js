
import React, { useEffect, useState } from "react";
import TabularViewer from "../TabularViewer";
import axios from "axios";


const UserModule = () => {

    const HTTPCLIENT_BASE_URL = "http://localhost:8000/";

    // React Hook separated by getter + setter
    const [tableData, setTableData] = useState({});
  
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
        .get("/", {headers: {}})
        .then((response) => {
            console.log("-----");
            console.log(response.data);
            console.log("first student", response.data["student"][0])
            setTableData(response.data["student"]);
        })
        .catch((error) => {
        });
    }

    useEffect(() => {
        getRequest()
    }, []);

    return (
        <div>
            <TabularViewer title={"User"} data={tableData}/>
        </div>
    );
}
export default UserModule;