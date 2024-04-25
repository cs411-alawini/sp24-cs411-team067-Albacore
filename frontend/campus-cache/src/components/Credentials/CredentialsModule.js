
import React, { useEffect} from "react";
import { httpClient } from "../../infra";
import TabularViewerAdmin from "../Tables/TabularViewerAdmin";

const CredentialsModule = () => {
    // React Hook separated by getter + setter
    // Axios is a simple http client library

    const headers = [
      {"field": "netid", "headerName": "NetID", "editable": false},
      {"field": "password", "headerName": "Password",  "editable": true},
      {"field": "permission", "headerName" : "Permission", "editable": false}]
  
    const getRequest = () => {
      const jwtToken = localStorage.getItem("JWTToken");
      return httpClient
        .get("/credentials", {headers: {Authorization: "Bearer " + jwtToken}})
    }

    const putRequest = (id, body) => { // Remember 'Put' is idempotent
      return httpClient
        .put("/credentials/" + id , body);
    } 

    useEffect(() => {
    }, []);

    return (
      <TabularViewerAdmin title={"credentials"} grabData={getRequest} updateData={putRequest} tableHeaders={headers} uniqueIdentifier={"netid"}/>
    );
}
export default CredentialsModule;