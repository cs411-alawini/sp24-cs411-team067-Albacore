
import React, { useEffect, useState, useMemo } from "react";
import TabularViewer from "../TabularViewer";
import axios from "axios";
import { httpClient } from "../../infra";

const CredentialsModule = () => {
    // React Hook separated by getter + setter
    // Axios is a simple http client library
  
    const getRequest = () => {
      return httpClient
        .get("/credentials", {headers: {}})
    }

    // const memoizedData = useMemo(()=> getRequest, [])

    useEffect(() => {
    }, []);

    return (
        <div>
          <TabularViewer title={"Credentials"} getDataFunc={getRequest}/>
        </div>
    );
}
export default CredentialsModule;