import React, { useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Tabs, Tab, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

interface NavbarProps {
  toggleColorMode: () => void;
  mode: 'light' | 'dark';
}

const Navbar: React.FC<NavbarProps> = ({ toggleColorMode, mode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tabIndex, setTabIndex] = React.useState(0);

  // Mettre à jour l'onglet actif en fonction de l'URL
  useEffect(() => {
    const path = location.pathname;
    if (path === '/') setTabIndex(0);
    else if (path === '/new-ticket') setTabIndex(1);
    else if (path.startsWith('/tickets')) setTabIndex(2);
  }, [location]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    switch(newValue) {
      case 0:
        navigate('/');
        break;
      case 1:
        navigate('/new-ticket');
        break;
      case 2:
        navigate('/tickets');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        backgroundColor: '#fff',
        color: '#333',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderRadius: '16px',
        top: 8,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: 1200,
        zIndex: (theme) => theme.zIndex.appBar + 1,
      }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ width: '200px', display: 'flex', alignItems: 'center' }}>
          <img 
            src="/Logo-Revolte.png" 
            alt="Revolte Logo" 
            style={{ height: '40px', width: 'auto' }} 
          />
        </Box>

        <Tabs
          value={tabIndex}
          onChange={handleChange}
          textColor="inherit"
          aria-label="navigation tabs"
          sx={{
            '& .MuiTabs-flexContainer': {
              justifyContent: 'center',
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'black',
              height: 3,
            },
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <Tab
            label="Dashboard"
            sx={{
              borderLeft: 'none',
              borderRight: 'none',
              textTransform: 'none',
              minWidth: 100,
            }}
          />
          <Tab
            label="Nouveau ticket"
            sx={{
              borderLeft: 'none',
              borderRight: 'none',
              textTransform: 'none',
              minWidth: 100,
            }}
          />
          <Tab
            label="Ticket List"
            sx={{
              borderLeft: 'none',
              borderRight: 'none',
              textTransform: 'none',
              minWidth: 100,
            }}
          />
        </Tabs>

        <Box sx={{ width: '200px', display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton color="inherit" onClick={toggleColorMode}>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
