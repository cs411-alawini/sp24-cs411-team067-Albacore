import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

// This is an example of a higher-order component using PropTypes as args

const TabularViewer = ({title, data}) => {
    const [tableData, setTableData] = useState([]);

    const headers = [
        {field: "netID", headerName: "NetID"},
        {field: "password", headerName: "Password"},
        {field: "permission", headerName: "Permissions"},
        {field: "certification", headerName: "Certification"}
    ];

    useEffect(() => {
        // let tempData = []; // mutable
        // for (let i = 0; i < 5; i++) {
        //     let tempObject = {};
        //     for (let j = 0; j < 4; j++) {
        //         tempObject[headers[j]["field"]] = data[i][j];
        //     }
        //     console.log("tempObject", tempObject);
        //     tempData.push(tempObject);
        // }
        // console.log("tempData", tempData);
        // setTableData(tempData);
    }, []);


    return (
        <div>
            <p>
                {title}
            </p>
            {/* <DataGrid
            getRowId={row=>row.netID}
            rows={tableData}
            columns={headers}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            /> */}
        </div>
    );
}


TabularViewer.propTypes = {
    title: PropTypes.string,
    data: PropTypes.array
};

export default TabularViewer;