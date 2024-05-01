import React, {useState, useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import {DataGrid,GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter, GridToolbarFilterButton, GridToolbarDensitySelector} from '@mui/x-data-grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button} from "@mui/material";
import EmptyRowDisplay from "./EmptyRowDisplay";

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

const TabularViewerBase = ({title, grabData, updateData, tableHeaders, uniqueIdentifier, positionNotAbsolute}) => {

    const [tableData, setTableData] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    const [loading, setLoading] = useState(true);
    // Code used from MUI docs: https://mui.com/x/react-data-grid/editing/
    
    // TODO: Remove reserve button for non-active reservations or make a query that removes them 
    const columns = tableHeaders;


    const processRowUpdate = () => {}

    useEffect(() => {
      grabData().then((response) => {
        setTableData(response.data[title]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
    }, []);

    const getPosition = () => {
      if (positionNotAbsolute) { 
        // TODO: Clean up this hack, use grid
        return "relative"
      } else {
        return "absolute"
      }
    }
    
    return (
        <Box justifyContent="center" sx={{display: "flex",  width: '100%' }}>
          <DataGrid
            autoHeight
            loading={loading}
            style={{position: getPosition()}}
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
    uniqueIdentifier: PropTypes.string,
    positionNotAbsolute: PropTypes.bool
};

export default TabularViewerBase;