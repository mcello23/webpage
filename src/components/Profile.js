import React from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { downloadFile } from '../utils/download'; // Import the utility

const ProfileImage = styled('img')({
  width: '100%',
});

function Profile() {
  const handleDownload = () => {
    downloadFile("https://www.dropbox.com/scl/fi/m8xsfhlkk6zye20vz7fvc/Marcelo-s-Resume-Q3-2023.pdf?rlkey=nfcbts87e9gv4o0nrjq4v57yc&dl=0", "Marcelo-s-Resume-Q3-2023.pdf"); // Call the utility
  };

  return (
    <Box my={4}>
      <Typography variant="h4" align="center" gutterBottom>
        QA Lead
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3}>
            <ProfileImage src="./assets/DSC_9554.jpg" alt="personal-picture" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="body1" paragraph>
            Hi! I have been working as a QA for the last 6 years in companies like Apple, EA and, more recently, Nespresso IoT in which I'm QA Lead managing a team of 5 manual testers and 3 automation ones.
          </Typography>
          <Typography variant="body1" paragraph>
            Recently, I've implemented KPIs to track the quality of tests, bugs opened and closed each sprint, refactored manual and automated test cases, execute regression, pairing, stability and smoke tests before every new deployment. Taken care of Market Acceptance Tests (MATs), User Acceptance Testing (UATs) of every new machine that comes out.
          </Typography>
          <Typography variant="body1" paragraph>
            My experience is focused in testing apps for iOS and Android with real and simulated devices using a stack that goes from Appium, Xcode, Cucumber, XCUITest, Espresso, XRay, Ruby, Postman, Swift and JavaScript. Documentation with Confluence and Jira.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleDownload}> {/* Use the handler */}
            Download my CV
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Profile;