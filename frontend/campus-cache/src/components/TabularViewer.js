import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {
    DataGrid,
    GridRowModes
} from '@mui/x-data-grid';
import EmptyRowDisplay from "./EmptyRowDisplay";
import EditableColumn from "./EditableColumn";
import LoginBar from "./LoginBar";
import { Box } from "@mui/material";


const TabularViewer = ({title, grabData, tableHeaders}) => {
    const [rows, setRows] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    useEffect(() => {
        grabData().then((response) => {
            let editableTableHeaders = tableHeaders;
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
        <LoginBar/>
          <Box sx={{
            display: 'flex',
            height: 400,
            width: '100%',
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
          }}>
            <div style={{ flexGrow: 1, maxWidth: '95%' }}>
              <DataGrid
                  autoHeight
                  getRowId={row=>row.netid}
                  rows={tableData}
                  columns={headers}
                  pageSizeOptions={[5, 10]}
                  slots={{ noRowsOverlay: EmptyRowDisplay }}
                  sx={{ '--DataGrid-overlayHeight': '300px' }}
                  checkboxSelection
              />
            </div>
          </Box>
        </div>
        
    );
}


TabularViewer.propTypes = {
    title: PropTypes.string,
    grabData: PropTypes.func,
    tableHeaders: PropTypes.array
};

export default TabularViewer;