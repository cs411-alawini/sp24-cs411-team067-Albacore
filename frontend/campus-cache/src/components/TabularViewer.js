import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

// This is an example of a higher-order component using PropTypes as args

const TabularViewer = ({title, data}) => {
    const [tableData, setTableData] = useState([]);
    const [headers, setHeaders] = useState([]);
    useEffect(() => {
        setHeaders(data["table_headers"]);
        setTableData(data["credentials"]);
    });

    return (
        <div>
            <p>
                {title}
            </p>
            <DataGrid
            getRowId={row=>row.netid}
            rows={tableData}
            columns={headers}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            />
        </div>
    );
}


TabularViewer.propTypes = {
    title: PropTypes.string,
    data: PropTypes.object
};

export default TabularViewer;