import React, {useState, useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import {DataGrid,GridToolbarContainer, GridToolbarExport, GridToolbarQuickFilter, GridToolbarFilterButton, GridToolbarDensitySelector} from '@mui/x-data-grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Box, Button, Dialog,DialogActions, DialogTitle, Typography} from "@mui/material";
import EmptyRowDisplay from "./EmptyRowDisplay";
import * as GeoLib from 'geolib';

const CustomToolbar = () => {
  return (
    <Box justifyContent="center" sx={{display: "flex",  width: '100%' }}>
      <GridToolbarContainer>
        <GridToolbarFilterButton/>
        <GridToolbarDensitySelector/>
        <GridToolbarExport/>
      </GridToolbarContainer>
    </Box>
  );
}

const TabularViewerGeolocator = ({title, grabData, updateData, tableHeaders, uniqueIdentifier}) => {
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [rowModesModel, setRowModesModel] = useState({});
    const [distanceColEnabled, setDistanceColEnabled] = useState(false);
    
    // TODO: Remove reserve button for non-active reservations or make a query that removes them 
    const columns = distanceColEnabled ? tableHeaders.concat(
        {
            field: 'Distance Away',
            headerName: 'Distance Away',
            sortable: false,
            headerAlign: 'center',
            align: 'center',
            minWidth: 150, 
            renderCell: (params) => (
                <p color={"black"}> {getDistanceString(params)} </p>
            )
        }, 
    )
    : tableHeaders;

    const getDistanceString = (params) => {
        try {
            return calculateDistance(params["row"]["latitude"], params["row"]["longitude"]) + " miles";
        } catch (e) {
            setDistanceColEnabled(false);
            return "Error loading distance"
        }
    }

    const calculateDistance = (targetLatitude, targetLongitude) => {
        const distance = GeoLib.getDistance(
          { latitude: latitude, longitude: longitude },
          { latitude: targetLatitude, longitude: targetLongitude},
        ); 
        return ((distance / 1000) * 0.621371).toFixed(2);
    };

    // Recommended way to solve by GPT 3.5 although edited 
    // to enforce blocking mechanism for lagging data
    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            (position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                if (navigator.geolocation) {
                    setDistanceColEnabled(true);
                } else {
                    setDistanceColEnabled(false);
                }
                grabData().then((response) => {
                    setTableData(response.data[title]);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                });
            },
            (error) => {
                setDistanceColEnabled(false)
                grabData().then((response) => {
                    setTableData(response.data[title]);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                });
                console.error('Error getting current location:', error); });   
        } else {
            setDistanceColEnabled(false);
            grabData().then((response) => {
                setTableData(response.data[title]);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
            });
            console.error('Geolocation is not supported by this browser.'); }
    };

    const processRowUpdate = () => {}

    useEffect(() => {
        getCurrentLocation();
    }, []);
    
    return (
        <>
            <Box justifyContent="center" sx={{display: "flex",  width: '100%' }}>
                <DataGrid
                    autoHeight
                    loading={loading}
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
        </>
    );
}

TabularViewerGeolocator.propTypes = {
    title: PropTypes.string,
    grabData: PropTypes.func,
    updateData: PropTypes.func,
    tableHeaders: PropTypes.array,
    uniqueIdentifier: PropTypes.string
};

export default TabularViewerGeolocator 