import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
// Partially written by GPT 3.5
const UnauthorizedPage = () => {
    return (
      <Container component="main" maxWidth="xs">
        <Box 
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 60, color: 'error.main' }} />
          <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
            Unauthorized Access
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            You do not have permission to view this page.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            href="/"
          >
            Go Back Home
          </Button>
        </Box>
      </Container>
    );
  }
  
  export default UnauthorizedPage;