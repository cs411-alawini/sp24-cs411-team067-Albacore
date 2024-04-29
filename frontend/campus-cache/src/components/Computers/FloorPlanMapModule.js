import React, { useState } from 'react';

import { httpClient } from "../../infra";
import PropTypes from "prop-types";

import TabularViewerUserReserve from "../Tables/TabularViewerUserReserve";


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
    {id:"id", headerName: "id", type:'number'},
    {field: "os", headerName: "OS", editable: false, type: 'singleSelect',
    valueOptions:['Linux', 'Windows', 'MacOS']},
    {field: "nummonitors", headerName: "# Monitors", type: 'number'},
    {field: "count", headerName : "Count", type: 'number'}
]  

  const [selectedImageID, setSelectedImageID] = useState('G1');
  const [computerData, setComputerData] = useState([]);
  const { src, areas } = imagesData[selectedImageID];
  const [locationID, setLocationID] = useState(9);


  const handleImageChange = (event) => {
    setSelectedImageID(event.target.value);
    setComputerData([]);
  };

  const getRequest = (locID) => {
    const jwtToken = localStorage.getItem("JWTToken");
    return httpClient
      .get(`/computer_map/${locID}`)
  }

  const handleAreaClick = (locID) => {
    console.log(`Area clicked: ${locID}`);
    getRequest(locID).then((response) => {
        console.log(response.data["ComputerStat"])
        setComputerData(response.data["ComputerStat"]);
        console.log(computerData)
        // setLocationID(locID);
    }).catch((error) => {
        console.log(error)
    }
    );
  };

  return (
    <div>
      <label htmlFor="image-select">Select a Facility!:</label>
      <select id="image-select" value={selectedImageID} onChange={handleImageChange}>
        <option value="G1">Grainger Library Floor 1</option>
        <option value="G4">Grainger Library Floor 4</option>
        {/* Add more options for additional images */}
      </select>

    <div>
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
    </div>
    <div>
                {computerData.length > 0 && (
                    <ul>
                        {computerData.map((item, index) => (
                            <li key={index}>
                                OS: {item.os}, Monitors: {item.nummonitors}, Count: {item.count}
                            </li>
                        ))}
                    </ul>
                )}
        {/* <TabularViewerUserReserve title={"ComputerStat"} grabData={() => getRequest(locationID)} tableHeaders={headers} uniqueIdentifier={"id"}/> */}
    </div>

    </div>
  );
};

// ParentComponent.propTypes={
//     computerData: PropTypes.array
// }

export default ParentComponent;
