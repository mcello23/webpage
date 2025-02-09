import { Box, Typography } from '@mui/material';
import React from 'react';

function Parallax({ image, title }) {
  return (
    <Box
      sx={{
        height: '400px',
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h2" color="white">
        {title}
      </Typography>
    </Box>
  );
}

export default Parallax;