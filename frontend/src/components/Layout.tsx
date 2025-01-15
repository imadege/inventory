import React, { ReactNode, useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from './Header';


interface LayoutProps {

  children: ReactNode;

}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Header */}
      <Header onMenuToggle={handleMenuToggle} />
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          marginLeft: { md: '70px' },
          marginRight: {md: '70px'},
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
