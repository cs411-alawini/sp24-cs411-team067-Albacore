
import React, { useEffect} from "react";
import TabularViewer from "../TabularViewer";
import { httpClient } from "../../infra";

const CredentialsModule = () => {
    // React Hook separated by getter + setter
    // Axios is a simple http client library

    const headers = [
      {"field": "netid", "headerName": "NetID", "editable": false},
      {"field": "password", "headerName": "Password",  "editable": false},
      {"field": "majorid", "headerName" : "MajorID", "editable": false}]
  
    const getRequest = () => {
      return httpClient
        .get("/credentials", {headers: {}})
    }

    const putRequest = (netid, body) => { // Remember 'Put' is idempotent
      return httpClient
        .put("/credentials/", body);
    } 

    useEffect(() => {
    }, []);

    return (
        <div>
          <TabularViewer title={"credentials"} grabData={getRequest} updateData={putRequest} tableHeaders={headers} uniqueIdentifier={"netid"}/>
        </div>
    );
}
export default CredentialsModule;