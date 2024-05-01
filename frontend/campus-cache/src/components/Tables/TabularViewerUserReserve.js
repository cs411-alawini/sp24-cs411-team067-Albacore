import React, {useState, useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import {DataGrid,GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarQuickFilter} from '@mui/x-data-grid';
import EmptyRowDisplay from "./EmptyRowDisplay";
import ReservationButton from "./ReservationButton";
import { Box, Container } from "@mui/material";
import DialogueReserveItemForm from "../Inventory/DialogueReserveItemForm";

const CustomToolbarUserReserve = () => {
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
        <GridToolbarDensitySelector/>
        <GridToolbarExport/>
      </GridToolbarContainer>
    </Box>
  );
}

const TabularViewerUserReserve = ({title, grabData, updateData, tableHeaders, uniqueIdentifier}) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [item, setItem] = useState();
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowModesModel, setRowModesModel] = useState({});
    // Code used from MUI docs: https://mui.com/x/react-data-grid/editing/
    
    const columns = tableHeaders.concat(
      {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        headerAlign: 'center',
        align: 'right',
        renderCell: (params) => (
          <ReservationButton availability={params.row.availability} setDialog={setDialogOpen} setItem={setItem} params={params} />
        ),
      }
    )


    const processRowUpdate = () => {}

    useEffect(() => {
      grabData().then((response) => {
        console.log(response)
        setTableData(response.data[title]);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
    }, []);
    
    return (
      <Box justifyContent="center" sx={{display: "flex",  width: '100%', bgcolor: 'error.light'}}>
        <DialogueReserveItemForm dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} rowID={item}/>
        <DataGrid
          autoHeight
          loading={loading}
          style={{position: "absolute"}}
          getRowId={row=>row[uniqueIdentifier]}
          rows={tableData}
          editMode="row"
          columns={columns}
          pageSizeOptions={[5, 10]}
          slots={{ noRowsOverlay: EmptyRowDisplay,  toolbar: CustomToolbarUserReserve }}
          rowModesModel={rowModesModel}
          processRowUpdate={processRowUpdate}
          pagination
        />
      </Box>
    );
}

TabularViewerUserReserve.propTypes = {
    title: PropTypes.string,
    grabData: PropTypes.func,
    updateData: PropTypes.func,
    tableHeaders: PropTypes.array,
    uniqueIdentifier: PropTypes.string
};

export default TabularViewerUserReserve;