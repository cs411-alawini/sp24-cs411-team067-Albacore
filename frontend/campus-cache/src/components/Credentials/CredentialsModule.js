
import React, { useEffect, useState} from "react";
import { httpClient } from "../../infra";
import TabularViewerAdmin from "../Tables/TabularViewerAdmin";
import DialogForm from "../DialogForm";
import { TabularViewerBase } from "../Tables/TabularViewerBase";

const CredentialsModule = () => {
    const [dialogOpen, setDialogOpen] = useState(true);

    // React Hook separated by getter + setter
    // Axios is a simple http client library

    const headers = [
      {"field": "netid", "headerName": "NetID", "editable": false, minWidth: 250 },
      {"field": "password", "headerName": "Password",  "editable": false, minWidth: 250 },
      {"field": "permission", "headerName" : "Permission", "editable": true, "type": "counter", minWidth: 250}]
  
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
      <>
        <TabularViewerBase title={"Credentials"} grabData={getRequest} updateData={putRequest} tableHeaders={headers} uniqueIdentifier={"netid"} />
        
      </>
    );
}
export default CredentialsModule;