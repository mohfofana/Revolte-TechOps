import { useState, useMemo } from 'react';
import { ThemeProvider, CssBaseline, Toolbar } from '@mui/material';
import { getDesignTokens } from './theme';
import { createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NewTicket from './pages/NewTicket';
import TicketDetails from './pages/TicketDetails';
import TicketsPage from './pages/TicketsPage';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Navbar toggleColorMode={toggleColorMode} mode={mode} />
        <Toolbar /> {/* espace pour la navbar fixe */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tickets" element={<TicketsPage />}>
            <Route index element={null} />
            <Route path=":id" element={<TicketDetails />} />
          </Route>
          <Route path="/new-ticket" element={<NewTicket />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
