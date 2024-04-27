import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {DataGrid,GridRowModes,GridActionsCellItem,GridRowEditStopReasons,GridToolbarContainer, GridToolbarExport,GridToolbarFilterButton,GridToolbarDensitySelector, GridToolbarQuickFilter} from '@mui/x-data-grid';
import EmptyRowDisplay from "./EmptyRowDisplay";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Box } from "@mui/material";

const CustomToolbar = () => {
  return (
    <Box justifyContent="center" sx={{ display: "flex",  width: '100%' }}>
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

const TabularViewerAdmin = ({title, grabData, updateData, tableHeaders, uniqueIdentifier}) => {

    const [tableData, setTableData] = useState([]);
    const [rowModesModel, setRowModesModel] = useState({});
    // Below is not an ideal use case for memoization, but an example of how one would do this
    // Code used from MUI docs: https://mui.com/x/react-data-grid/editing/
    const columns = tableHeaders.concat({
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
  
          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<SaveIcon />}
                label="Save"
                sx={{
                  color: 'primary.main',
                }}
                onClick={handleSaveClick(id)}
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }
  
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(id)}
              color="inherit"
            />,
          ];
        },
    })

    const handleRowModesModelChange = (newRowModesModel) => {
      setRowModesModel(newRowModesModel);
    };

    const handleRowEditStop = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
        event.defaultMuiPrevented = true;
      }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const processRowUpdate = (newRow) => {
      const updatedRow = { ...newRow, isNew: false };
      const idToUpdate = tableData.findIndex((row) => row.id === newRow.id);
      const rowToUpdate = tableData[idToUpdate];
      var body = {};
      for (const cell in updatedRow) {
        body[cell] = updatedRow[cell];
      }
      updateData(idToUpdate, body).then((response) => {})
      .catch((error) => {
      });
      return updatedRow;
    };
      
    const handleSaveClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
      
    const handleDeleteClick = (id) => () => {
      setTableData(tableData.filter((row) => row.id !== id));
    };
      
    const handleCancelClick = (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
  
      const editedRow = tableData.find((row) => row.netid === id);
      if (editedRow.isNew) {
        setTableData(tableData.filter((row) => row.netid !== id));
      }
    };

    useEffect(() => {
      grabData().then((response) => {
          setTableData(response.data[title]);
          console.log(response.data);
      })
      .catch((error) => {
      });
    }, []);
    
    return (
      <Box justifyContent="center" sx={{backgroundColor: '#1f2d3d', display: "flex",  width: '100%' }}>
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
            onRowEditStop={handleRowEditStop}
            onRowModesModelChange={handleRowModesModelChange}
            checkboxSelection
            pagination
          />
      </Box>  
    );
}

TabularViewerAdmin.propTypes = {
    title: PropTypes.string,
    grabData: PropTypes.func,
    updateData: PropTypes.func,
    tableHeaders: PropTypes.array,
    uniqueIdentifier: PropTypes.string
};

export default TabularViewerAdmin;