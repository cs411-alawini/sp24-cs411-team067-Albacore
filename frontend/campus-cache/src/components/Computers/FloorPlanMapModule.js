import React, { useEffect, useState } from 'react';

import { httpClient } from "../../infra";
import PropTypes from "prop-types";

import TabularViewerUserReserve from "../Tables/TabularViewerUserReserve";
import { TabularViewerBase } from '../Tables';
import { Box, Divider, Grid, MenuItem, Select, Typography } from '@mui/material';


const imagesData = {
    G4: {
      src: 'https://www.library.illinois.edu/enx/wp-content/uploads/sites/27/2021/07/ENX_04_plan.png',
      areas: [
        { shape: 'poly', coords: '460,117,489,120,511,120,538,126,565,127,590,135,589,153,588,169,589,182,589,200,569,193,549,190,529,186,510,183,490,182,475,180,461,176,463,141,461,133', alt: 'Area 1-1', locationID: 10},
        { shape: 'poly', coords: '660,155,790,157,790,275,688,278,688,236,658,232', alt: 'Area 1-1', locationID: 6}
      ]
    },
    G1: {
      src: 'https://www.library.illinois.edu/enx/wp-content/uploads/sites/27/2017/04/ENX_01_plan.png',
      areas: [
        { shape: 'rect', coords: '510,127,604,223 ', alt: 'Area 2-1', locationID: 9}
      ]
    }
  };


const ParentComponent = () => {

const headers = [
    {field: "os", headerName: "OS", editable: false, type: 'singleSelect',minWidth: 250,
    valueOptions:['Linux', 'Windows', 'MacOS']},
    {field: "nummonitors", headerName: "Number of Monitors", type: 'number' , minWidth: 250},
    {field: "count", headerName : "Count", type: 'number', minWidth: 250}
]  

  const [selectedImageID, setSelectedImageID] = useState('G1');
  const [computerData, setComputerData] = useState([]);
  const { src, areas } = imagesData[selectedImageID];
  const [locationID, setLocationID] = useState();


  const handleImageChange = (event) => {
    setSelectedImageID(event.target.value);
    setComputerData([]);
  };

  const getRequest = (locID) => {
    const jwtToken = localStorage.getItem("JWTToken");
    return httpClient
      .get(`/computer_map/${locID}`, {headers: {Authorization: "Bearer " + jwtToken}})
  }

  const handleAreaClick = (locID) => {
    getRequest(locID).then((response) => {
        setComputerData(response.data["ComputerStat"]);
        setLocationID(locID);
    }).catch((error) => {
        console.log(error)
    }
    );
  };

  useEffect(()=> {
  })

  return (
    <>
      
      <Grid align='center'>
      <label htmlFor="image-select">Select a Facility:</label>
      <Select id="image-select" value={selectedImageID} onChange={handleImageChange}>
        <MenuItem value="G1">Grainger Library Floor 1</MenuItem>
        <MenuItem value="G4">Grainger Library Floor 4</MenuItem>
        {/* Add more options for additional images */}
      </Select>
        <Divider/>
        <img src={src} useMap="#floorplan-map" alt="Floor Plan" />
            <map name="floorplan-map">
                {areas.map((area, index) => (
                <area
                    key={index}
                    shape={area.shape}
                    coords={area.coords}
                    alt={area.alt}
                    href="#"
                    onClick={(e) => { e.preventDefault(); handleAreaClick(area.locationID); }}
                />
                ))}
            </map>
        </Grid>
        {(locationID === 9)?
            <Grid align={"center"} >
                <Typography variant="h5" color="primary" fontSize={30}>
                    {"Grainger Floor 1"}
                </Typography>
                <TabularViewerBase title={"ComputerStat"} grabData={()=> getRequest(9)} tableHeaders={headers} uniqueIdentifier={"id"}/>
            </Grid> :
            <Grid align={"center"} >
            <Typography variant="h5" color="primary" fontSize={30}>
                    {"Grainger Floor 4"}
            </Typography>
            <TabularViewerBase title={"ComputerStat"} grabData={()=> getRequest(10)} tableHeaders={headers} uniqueIdentifier={"id"}/>
            </Grid>}   
    </>
  );
};


export default ParentComponent;