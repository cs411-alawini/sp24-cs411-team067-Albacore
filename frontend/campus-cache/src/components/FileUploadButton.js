import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { GridAddIcon } from '@mui/x-data-grid';

// Used from: https://mui.com/material-ui/react-button/#file-upload

const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

const FileUploadButton = () => {
    
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<GridAddIcon/>}
      sx={{
        backgroundColor: '#87CEEB', // Light Blue
        '&:hover': {
          backgroundColor: '#7CBEEB', // Darker when hovered
        },
      }}
    >
      Upload CSV
      <VisuallyHiddenInput
        accept=".csv" 
        type="file" />
    </Button>
  );
};

export default FileUploadButton;