import { Box, Typography } from '@mui/material';
import React from 'react';

function TestFundamentals() {
  return (
    <Box my={4}>
      <Typography variant="h4" align="center" gutterBottom>
        Test Fundamentals
      </Typography>
      <Typography variant="body1" paragraph>
        The test pyramid is a visual metaphor that represents the recommended balance between different types of tests in an application. It is called a "pyramid" because the base of the pyramid represents the tests that should be the most numerous, while the top of the pyramid represents the tests that should be the least numerous.
      </Typography>
      <Typography variant="body1" paragraph>
        The idea behind the test pyramid is that you should have a large number of low-level unit tests, a smaller number of integration tests, and an even smaller number of end-to-end (E2E) tests. This is represented by the shape of the pyramid, with unit tests at the bottom (the widest part), integration tests in the middle, and E2E tests at the top (the narrowest part).
      </Typography>
      <Typography variant="body1" paragraph>
        The rationale behind this recommendation is that unit tests are typically faster and easier to write than integration or E2E tests, and they provide a solid foundation for testing the individual units or components of an application. Integration tests come next and provide a way to test how different units or components work together. Finally, E2E tests are the most expensive and time-consuming to write, but they provide the highest level of confidence that the application is working as expected in a real-world scenario.
      </Typography>
    </Box>
  );
}

export default TestFundamentals;