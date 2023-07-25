import React, { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SignIn from './SignIn';


const SearchBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  const alertMessage = () => {
    alert("Click me for something New")
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center,", alignItems: "center", rowGap: "10px", columnGap: "20px" }}>
      <Grid style={{ display: 'flex', alignItems: 'center' }}>
        <IconButton size="large" onClick={handleSearchOpen}>

          <SearchIcon sx={{
            fontSize: { xs: "1.5rem", sm: "2rem" },
            color: "white",
            display: isSearchOpen ? 'none' : 'block',
          }} titleAccess='search' />

        </IconButton>
        <Grid
          style={{
            overflow: 'hidden',
            maxWidth: isSearchOpen ? '200px' : '0',
            transition: 'max-width .5s ease-in-out',
          }}
        >

          {isSearchOpen && (
            <TextField
              sx={{
                border: '2px solid #ffff',
                '& .MuiInputBase-input': {
                  color: 'white', // Set the text color
                },
                '& .MuiInputBase-input::placeholder': {
                  color: '#999', // Set the placeholder color
                },
              }}
              variant="outlined"
              placeholder='Search'
              size="small"
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton size="small" onClick={handleSearchClose}>
                      <SearchIcon sx={{ fontSize: "1.5rem", color: "white", marginLeft: "-10px" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

          )}
        </Grid>
      </Grid>
      <NotificationsIcon onClick={() => alertMessage()} sx={{ fontSize: "2rem", color: "white", display: { xs: 'none', md: 'flex' } }} titleAccess='Notification' />

      <SignIn />

    </Box>
  );
};

export default SearchBar;
