import React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

function NavBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home-link" href="https://mcello23.github.io/webpage/">
          <HomeIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="github-link" href="https://github.com/mcello23">
          <GitHubIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="linkedin-link" href="https://www.linkedin.com/in/marceloc/">
          <LinkedInIcon />
        </IconButton>
        <IconButton color="inherit" aria-label="email-link" href="mailto:marceloadsc@gmail.com?subject=Hello&body=Hi%2C%20how%20are%20you%3F">
          <MailOutlineIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;