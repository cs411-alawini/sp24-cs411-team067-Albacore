import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {
    DataGrid,
    GridRowModes,
    GridActionsCellItem
} from '@mui/x-data-grid';

import EmptyRowDisplay from "./EmptyRowDisplay";
import EditableColumn from "./EditableColumn";

// Th

const TabularViewer = ({title, getDataFunc}) => {
    const [rows, setRows] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    useEffect(() => {
        getDataFunc().then((response) => {
            let editableTableHeaders = response.data["table_headers"];
            
            setHeaders(editableTableHeaders);
            editableTableHeaders.push(EditableColumn(handleSaveClick, handleCancelClick, handleDeleteClick, handleEditClick, rowModesModel));
            console.log("newheaders: ", editableTableHeaders);
            setTableData(response.data["credentials"]);
        })
        .catch((error) => {
        });
    }, [setHeaders]);

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
      };
    
      const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
      };
    
      const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
      };
    
      const handleCancelClick = (id) => () => {
        setRowModesModel({
          ...rowModesModel,
          [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });
    
        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
          setRows(rows.filter((row) => row.id !== id));
        }
    };

    return (
        <div>
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
        </div>
        
    );
}


TabularViewer.propTypes = {
    title: PropTypes.string,
    getDataFunc: PropTypes.func
};

export default TabularViewer;