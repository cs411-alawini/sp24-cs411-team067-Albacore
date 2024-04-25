import React, {useState, useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import {DataGrid,GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarQuickFilter} from '@mui/x-data-grid';
import EmptyRowDisplay from "./EmptyRowDisplay";
import ReservationButton from "../Inventory/ReservationButton";

const CustomToolbar = () => {
  return (
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
  );
}

const TabularViewerUserReserve = ({title, grabData, updateData, tableHeaders, uniqueIdentifier}) => {

    const [tableData, setTableData] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    // Code used from MUI docs: https://mui.com/x/react-data-grid/editing/
    
    const columns = useMemo(() => tableHeaders.concat(
      {
        field: 'action',
        headerName: 'Action',
        sortable: false,
        headerAlign: 'center',
        align: 'right',
        renderCell: (params) => (
          <ReservationButton params={params.row.availability}/>
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