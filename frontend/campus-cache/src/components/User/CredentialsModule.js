
import React, { useEffect} from "react";
import TabularViewer from "../TabularViewer";
import { httpClient } from "../../infra";

const CredentialsModule = () => {
    // React Hook separated by getter + setter
    // Axios is a simple http client library

    const headers = [
      {"field": "netid", "headerName": "NetID", "editable": false},
      {"field": "password", "headerName": "Password",  "editable": true},
      {"field": "majorid", "headerName" : "MajorID", "editable": false}]
  
    const getRequest = () => {
      const jwtToken = localStorage.getItem("JWTToken");
      return httpClient
        .get("/credentials", {headers: {Authorization: "token " + jwtToken}})
    }

    const putRequest = (id, body) => { // Remember 'Put' is idempotent
      return httpClient
        .put("/credentials/" + id , body);
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