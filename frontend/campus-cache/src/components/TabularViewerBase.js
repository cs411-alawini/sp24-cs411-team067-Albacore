import React, {useState, useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import {DataGrid,GridRowModes,GridActionsCellItem,GridRowEditStopReasons, GridToolbar, GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector} from '@mui/x-data-grid';
import EmptyRowDisplay from "./EmptyRowDisplay";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, Checkbox } from "@mui/material";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton/>
      <GridToolbarDensitySelector/>
      <GridToolbarExport/>
    </GridToolbarContainer>
  );
}

const TabularViewerBase = ({title, grabData, updateData, tableHeaders, uniqueIdentifier}) => {

    const [tableData, setTableData] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    // Below is not an ideal use case for memoization, but an example of how one would do this
    // Code used from MUI docs: https://mui.com/x/react-data-grid/editing/
    
    // TODO: Remove reserve button for non-active reservations or make a query that removes them 
    const columns = useMemo(() => tableHeaders.concat(
      {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        headerAlign: 'center',
        align: 'right',
        renderCell: (params) => (
          
          <Button 
            variant="contained" 
            color="primary"
            size="small"
            sx={{ fontSize: '0.60rem' }}
            startIcon={<AddCircleOutlineIcon/>}>
            Reserve
          </Button>
        ),
      }
      )
    );

    const processRowUpdate = () => {}

    const checkLocalStorageItem = (key) => {
      // Try to get the item from local storage
      const item = localStorage.getItem(key);
      if (item === null) {
        console.log(`${key} does not exist in local storage.`);
        return false;
      } else {
        console.log(`${key} exists in local storage.`);
        return true;
      }
    }

    useEffect(() => {
      grabData().then((response) => {
          setTableData(response.data[title]);
          console.log(response.data);
      })
      .catch((error) => {
      });
    }, []);
    
    return (
      <div>
        <div style={{ flexGrow: 1, maxWidth: '95%' }}>
          <DataGrid
            autoHeight
            getRowId={row=>row[uniqueIdentifier]}
            rows={tableData}
            editMode="row"
            columns={columns}
            pageSizeOptions={[5, 10]}
            slots={{ noRowsOverlay: EmptyRowDisplay,  toolbar: CustomToolbar }}
            rowModesModel={rowModesModel}
            processRowUpdate={processRowUpdate}
            pagination
          />
        </div>
      </div>
        
    );
}

TabularViewerBase.propTypes = {
    title: PropTypes.string,
    grabData: PropTypes.func,
    updateData: PropTypes.func,
    tableHeaders: PropTypes.array,
    uniqueIdentifier: PropTypes.string
};

export default TabularViewerBase;