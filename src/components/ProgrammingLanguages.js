import CodeIcon from '@mui/icons-material/Code';
import DataObjectIcon from '@mui/icons-material/DataObject';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import LaptopIcon from '@mui/icons-material/Laptop';
import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

function ProgrammingLanguages() {
  return (
    <Box my={4}>
      <Typography variant="h4" align="center" gutterBottom>
        My Programming Languages
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box textAlign="center">
            <LaptopIcon fontSize="large" />
            <Typography variant="h6">Python</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box textAlign="center">
            <CodeIcon fontSize="large" />
            <Typography variant="h6">JavaScript</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box textAlign="center">
            <DataObjectIcon fontSize="large" />
            <Typography variant="h6">Swift</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Box textAlign="center">
            <DeveloperModeIcon fontSize="large" />
            <Typography variant="h6">Ruby</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProgrammingLanguages;