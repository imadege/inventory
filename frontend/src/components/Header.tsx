import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuToggle: () => void; // Function to toggle the sidebar
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar>
        {/* Left-side menu toggle button for small screens */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={onMenuToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>

        {/* App Title */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Material Manager
        </Typography>

        {/* Right-side menu items */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" onClick={() => navigate('/')}>
            Materials
          </Button>
          <Button color="inherit" onClick={() => navigate('/preferences')}>
            Preferences
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
