import React from "react";
import PropTypes from "prop-types";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

// This is an example of a higher-order component using PropTypes as args

const TabularViewer = ({title}) => {
    const data = [
        {
            id: 1,
            name: "Joe"
        },
        {
            id: 2,
            name: "Sally"
        },
        {
            id: 3,
            name: "Stanley"
        }
    ];

    const headers = [
        {field: "id", headerName: "ID"},
        {field: "name", headerName: "Name"}
    ];

    return (
        <div>
            <p>
                {title}
            </p>
            <DataGrid
            rows={data}
            columns={headers}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            />
        </div>
    );
}


TabularViewer.propTypes = {
    title: PropTypes.string
};

export default TabularViewer;