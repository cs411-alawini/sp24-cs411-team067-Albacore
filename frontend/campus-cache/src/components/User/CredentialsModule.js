
import React, { useEffect} from "react";
import TabularViewer from "../TabularViewer";
import { httpClient } from "../../infra";

const CredentialsModule = () => {
    // React Hook separated by getter + setter
    // Axios is a simple http client library

    const headers = [
      {"field": "netid", "headerName": "NetID"},
      {"field": "password", "headerName": "Password"},
      {"field": "majorid", "headerName" : "MajorID"}]
  
    const getRequest = () => {
      return httpClient
        .get("/credentials", {headers: {}})
    }

    useEffect(() => {
    }, []);

    return (
        <div>
          <TabularViewer title={"Credentials"} grabData={getRequest} tableHeaders={headers}/>
        </div>
    );
}
export default CredentialsModule;