import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {
    DataGrid
} from '@mui/x-data-grid';
import EmptyRowDisplay from "./EmptyRowDisplay";

// This is an example of a higher-order component using PropTypes as args

const TabularViewer = ({title, data}) => {
    const [tableData, setTableData] = useState([]);
    const [headers, setHeaders] = useState([]);
    useEffect(() => {
        if (data == undefined || data["credentials"].length <= 0) {
        } else {
            const editableTable = 
            setHeaders(data["table_headers"]);
            setTableData(data["credentials"]);
        } 
    });

    return (
        <DataGrid
        autoHeight
        getRowId={row=>row.netid}
        rows={tableData}
        columns={headers}
        // pageSizeOptions={[5, 10]}
        slots={{ noRowsOverlay: EmptyRowDisplay }}
        sx={{ '--DataGrid-overlayHeight': '300px' }}
        checkboxSelection
        />
    );
}


TabularViewer.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object
};

export default TabularViewer;