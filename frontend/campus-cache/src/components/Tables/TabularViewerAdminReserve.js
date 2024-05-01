import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {DataGrid,GridRowModes,GridActionsCellItem,GridRowEditStopReasons,GridToolbarContainer, GridToolbarExport,GridToolbarFilterButton,GridToolbarDensitySelector, GridToolbarQuickFilter} from '@mui/x-data-grid';
import EmptyRowDisplay from "./EmptyRowDisplay";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Snackbar, Typography } from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import DialogCredentialForm from "../Credentials/DialogCredentialForm";
import DialogDeleteItemConfirm from "../Reservations/DialogDeleteItemConfirm";
import ReservationButton from "./ReservationButton";
import ReturnButton from "./ReturnButton";

const CustomToolbarAdmin = ({CredentialsMode}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [item, setItem] = useState();
  const handleClickAddIcon = () => {
    setDialogOpen(true);
  }
  return (
    <Box justifyContent="center" sx={{ display: "flex",  width: '100%' }}>
      <DialogCredentialForm dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      <GridToolbarContainer>
        <GridToolbarQuickFilter
          quickFilterParser={(searchInput) =>
            searchInput.split(',').map((value) => value.trim())
          }
          quickFilterFormatter={(quickFilterValues) => quickFilterValues.join(', ')}
          debounceMs={200} // time before applying the new quick filter value
        />
        { CredentialsMode ? 
        <Button startIcon={<AddBoxIcon/>} size="small" color="primary" onClick={handleClickAddIcon}
          className="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall MuiButton-colorPrimary MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall MuiButton-colorPrimary css-1knaqv7-MuiButtonBase-root-MuiButton-root">
          Add
        </Button> : <div/>
        }
        <GridToolbarFilterButton/>
        <GridToolbarDensitySelector/>
        <GridToolbarExport/>
      </GridToolbarContainer>
    </Box>
  );
}

CustomToolbarAdmin.propTypes = {
  CredentialsMode: PropTypes.bool
};

const TabularViewerAdminReserve = ({title, grabData, updateData, tableHeaders, uniqueIdentifier, credentialsMode, deleteEnabled}) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [tableData, setTableData] = useState([]);
    const [item, setItem] = useState();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [rowModesModel, setRowModesModel] = useState({});
    const [loading, setLoading] = useState(true);
    // Below is not an ideal use case for memoization, but an example of how one would do this
    // Code used from MUI docs: https://mui.com/x/react-data-grid/editing/
    const columns = tableHeaders.concat(
        {
            field: 'action',
            headerName: 'Return',
            sortable: false,
            headerAlign: 'center',
            align: 'right',
            renderCell: (params) => (
              <ReturnButton availability={params.row.availability} setDialog={setDialogOpen} setItem={setItem} params={params} />
            ),
          },
        {
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
  
          return deleteEnabled ? [
            
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
          ] :
          [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
          ]
        },
    }).map((header, i) => ({
      ...header,
      hideable: false
    }))

    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };

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
      const jwtToken = localStorage.getItem("JWTToken");
      const updateHeaders = {headers: {Authorization: "Bearer " + jwtToken}}
      var body = {};
      for (const cell in updatedRow) {
        body[cell] = updatedRow[cell];
      }
      updateData(newRow[uniqueIdentifier], body, updateHeaders).then((response) => {
        setOpenSnackbar(true);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
      return updatedRow;
    };
      
    const handleSaveClick = (id) => () => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };
      
    const handleDeleteClick = (id) => () => {
      setDialogOpen(true)
      setItem(id);
    };
      
    const handleCancelClick = (id) => () => {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    };

    useEffect(() => {
      grabData().then((response) => {
          setTableData(response.data[title]);
          setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
      console.log("columns", columns);
    }, []);
    
    return (
      <Box justifyContent="center" sx={{backgroundColor: '#1f2d3d', display: "flex",  width: '100%' }}>
        {deleteEnabled ? <DialogDeleteItemConfirm setOpenSnackbar={setOpenSnackbar} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} rowID={item}/> : <div/>}
        <DataGrid
            autoHeight
            style={{position: "absolute"}}
            getRowId={row=>row[uniqueIdentifier]}
            rows={tableData}
            editMode="row"
            columns={columns}
            pageSizeOptions={[5, 10]}
            slots={{ noRowsOverlay: EmptyRowDisplay,  toolbar: CustomToolbarAdmin }}
            slotProps={{toolbar: {CredentialsMode: credentialsMode}}}
            rowModesModel={rowModesModel}
            processRowUpdate={processRowUpdate}
            onRowEditStop={handleRowEditStop}
            loading={loading}
            onRowModesModelChange={handleRowModesModelChange}
            pagination
            disableColumnSelector
          />
          <Snackbar
            open={openSnackbar}
            autoHideDuration={2500}
            onClose={handleCloseSnackbar}
            message="Row successfully changed."
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          />
      </Box>  
    );
}

TabularViewerAdminReserve.propTypes = {
    title: PropTypes.string,
    grabData: PropTypes.func,
    updateData: PropTypes.func,
    tableHeaders: PropTypes.array,
    uniqueIdentifier: PropTypes.string,
    credentialsMode: PropTypes.bool,
    deleteEnabled: PropTypes.bool
};

export default TabularViewerAdminReserve;