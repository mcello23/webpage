import React from 'react';
import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box mt={4} py={2} textAlign="center" bgcolor="grey.200">
      <Typography variant="h5">Thanks for the visit! ☺</Typography>
      <Typography variant="body1">Feel free to send me an e-mail or connect with me in any social media on top.</Typography>
      <Typography variant="body1">Marcelo Costa</Typography>
    </Box>
  );
}

export default Footer;