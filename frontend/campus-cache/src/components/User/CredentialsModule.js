
import React, { useEffect, useState, useMemo } from "react";
import TabularViewer from "../TabularViewer";
import axios from "axios";
import { httpClient } from "../../infra";

const CredentialsModule = () => {
    // React Hook separated by getter + setter
    
    const [tableData, setTableData] = useState({});
    // Axios is a simple http client library
  
    const getRequest = () => {
      httpClient
        .get("/credentials", {headers: {}})
        .then((response) => {
            setTableData(response.data["student"]);
        })
        .catch((error) => {
        });
    }

    // const memoizedData = useMemo(()=> getRequest, [])

    useEffect(() => {
        getRequest()
    }, []);

    return (
        <div>
          <button onClick={getRequest}>
            Click me
          </button>
          <TabularViewer title={"Credentials"} data={tableData}/>
        </div>
    );
}
export default CredentialsModule;