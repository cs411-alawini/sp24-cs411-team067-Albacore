import React, {useState, useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import {DataGrid,GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector} from '@mui/x-data-grid';
import EmptyRowDisplay from "../EmptyRowDisplay";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button} from "@mui/material";

const CustomToolbar = () => {
  return (
    <Box justifyContent="center" sx={{display: "flex",  width: '100%' }}>
      <GridToolbarContainer>
        <GridToolbarQuickFilter
          quickFilterParser={(searchInput) =>
            searchInput.split(',').map((value) => value.trim())
          }
          quickFilterFormatter={(quickFilterValues) => quickFilterValues.join(', ')}
          debounceMs={200} // time before applying the new quick filter value
        />
        <GridToolbarFilterButton/>
        <GridToolbarDensitySelector/>
        <GridToolbarExport/>
      </GridToolbarContainer>
    </Box>
  );
}

const TabularViewerBase = ({title, grabData, updateData, tableHeaders, uniqueIdentifier}) => {

    const [tableData, setTableData] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
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

    useEffect(() => {
      grabData().then((response) => {
          setTableData(response.data[title]);
          console.log(response.data);
      })
      .catch((error) => {
      });
    }, []);
    
    return (
        <Box justifyContent="center" sx={{display: "flex",  width: '100%' }}>
          <DataGrid
            autoHeight
            style={{position: "absolute"}}
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
        </Box>
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