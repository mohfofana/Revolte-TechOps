import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useParams, Outlet } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
  TextField,
  InputAdornment,
  useTheme,
  Avatar,
  Tooltip,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Search as SearchIcon,
  FilterList,
  Add,
  Sort,
  Visibility,
  Schedule,
  CheckCircle,
  Warning,
  Refresh,
  Close,

} from '@mui/icons-material';
import { fetchTickets } from '../services/api';
import type { Ticket, TicketFilters } from '../types/ticket';
import { HeaderCard, ActivityCard } from '../components/dashboard';

const statusMap: Record<string, { label: string; color: 'success' | 'warning' | 'error' | 'info' }> = {
  'open': { label: 'Ouvert', color: 'info' },
  'pending': { label: 'En attente', color: 'warning' },
  'closed': { label: 'Fermé', color: 'success' },
};

const priorityMap: Record<string, { color: string; icon: React.ReactNode }> = {
  'low': { color: '#4caf50', icon: <CheckCircle /> },
  'medium': { color: '#ff9800', icon: <Schedule /> },
  'high': { color: '#f44336', icon: <Warning /> },
  'urgent': { color: '#d32f2f', icon: <Warning /> }
};

interface TicketsListProps {
  onTicketSelect?: (ticketId: string | number) => void;
}

const TicketsList: React.FC<TicketsListProps> = ({ onTicketSelect }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const theme = useTheme();
  
  const statusParam = searchParams.get('status');
  const status: TicketFilters['status'] = (statusParam === 'open' || statusParam === 'pending' || statusParam === 'closed') 
    ? statusParam 
    : undefined;

  const loadTickets = async () => {
    try {
      setLoading(true);
      const filters: TicketFilters = {};
      if (status) {
        filters.status = status;
      }
      const data = await fetchTickets(filters);
      setTickets(data);
      setError(null);
    } catch (err) {
      console.error('Erreur lors du chargement des tickets:', err);
      setError('Impossible de charger les tickets. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTickets();
  }, [status]);

  const getStatusInfo = (status: string) => {
    return statusMap[status] || { label: status, color: 'default' };
  };

  const getPriorityInfo = (priority: string) => {
    return priorityMap[priority.toLowerCase()] || { color: theme.palette.grey[500], icon: <CheckCircle /> };
  };

  const handleTicketClick = (ticketId: number | string) => {
    if (onTicketSelect) {
      onTicketSelect(ticketId);
    } else {
      navigate(`/tickets/${ticketId}`);
    }
  };

  const handleRefresh = () => {
    loadTickets();
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.id.toString().includes(searchTerm)
  );

  if (loading) {
    return (
      <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Container 
          maxWidth="xl" 
          sx={{
            py: 4,
            px: { xs: 2, sm: 3 },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh',
          }}
        >
          <Box textAlign="center">
            <CircularProgress size={60} thickness={3} />
            <Typography variant="h6" sx={{ mt: 3, color: 'text.secondary' }}>
              Chargement des tickets...
            </Typography>
          </Box>
        </Container>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
          <Box textAlign="center" py={8}>
            <Warning sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
            <Typography color="error" variant="h6" gutterBottom>
              {error}
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<Refresh />} 
              onClick={handleRefresh}
              sx={{ mt: 2, borderRadius: 2 }}
            >
              Réessayer
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  // Fonction pour gérer le changement d'onglet
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    const statuses = ['open', 'pending', 'closed'];
    const status = statuses[newValue];
    navigate(`/tickets?status=${status}`);
  };

  // Déterminer l'onglet actif en fonction du statut
  const getActiveTab = () => {
    if (status === 'open') return 0;
    if (status === 'pending') return 1;
    if (status === 'closed') return 2;
    return 0;
  };

  return (
    <>
      {/* En-tête */}
      <HeaderCard
        title="Tous les tickets"
        subtitle={`${filteredTickets.length} ticket(s) trouvé(s)`}
        chips={[
          { label: `${tickets.length} total`, variant: 'outlined' },
          { 
            label: status ? statusMap[status]?.label || 'Tous statuts' : 'Tous statuts',
            variant: 'outlined',
            color: status ? statusMap[status]?.color || 'default' : 'default'
          },
          { 
            label: 'Données en temps réel',
            variant: 'outlined',
            color: 'success'
          }
        ]}
        addButtonText="Nouveau ticket"
        onAddClick={() => navigate('/new-ticket')}
      />

      {/* Onglets de statut */}
      <Paper 
        sx={{ 
          mb: 4, 
          borderRadius: 3, 
          overflow: 'hidden',
          bgcolor: 'background.paper',
          boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.08)}`
        }}
      >
        <Tabs
          value={getActiveTab()}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              height: 3,
              borderRadius: '3px 3px 0 0',
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            },
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.95rem',
              minHeight: 64,
              borderRadius: 2,
              margin: '0 4px',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: alpha(theme.palette.primary.main, 0.04),
                transform: 'translateY(-1px)',
              },
              '&.Mui-selected': {
                color: theme.palette.primary.main,
                bgcolor: alpha(theme.palette.primary.main, 0.08),
              }
            }
          }}
        >
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CheckCircle color={getActiveTab() === 0 ? 'primary' : 'action'} />
                <span>Ouverts</span>
                <Chip 
                  label={tickets.filter(t => t.status === 'open').length}
                  size="small"
                  sx={{ 
                    height: 20, 
                    fontSize: '0.7rem',
                    bgcolor: getActiveTab() === 0 ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                    color: getActiveTab() === 0 ? theme.palette.primary.main : 'text.secondary'
                  }}
                />
              </Box>
            }
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Schedule color={getActiveTab() === 1 ? 'warning' : 'action'} />
                <span>En attente</span>
                <Chip 
                  label={tickets.filter(t => t.status === 'pending').length}
                  size="small"
                  sx={{ 
                    height: 20, 
                    fontSize: '0.7rem',
                    bgcolor: getActiveTab() === 1 ? alpha(theme.palette.warning.main, 0.1) : 'transparent',
                    color: getActiveTab() === 1 ? theme.palette.warning.main : 'text.secondary'
                  }}
                />
              </Box>
            }
          />
          <Tab 
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Close color={getActiveTab() === 2 ? 'success' : 'action'} />
                <span>Fermés</span>
                <Chip 
                  label={tickets.filter(t => t.status === 'closed').length}
                  size="small"
                  sx={{ 
                    height: 20, 
                    fontSize: '0.7rem',
                    bgcolor: getActiveTab() === 2 ? alpha(theme.palette.success.main, 0.1) : 'transparent',
                    color: getActiveTab() === 2 ? theme.palette.success.main : 'text.secondary'
                  }}
                />
              </Box>
            }
          />
        </Tabs>
      </Paper>

      {/* Barre de recherche et actions */}
      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            lg: '2fr 1fr'
          },
          gap: 3,
          mb: 4
        }}
      >
        {/* Section principale avec la liste */}
        <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
          {/* Barre de recherche */}
          <Box sx={{ p: 3, borderBottom: `1px solid ${theme.palette.divider}` }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                fullWidth
                placeholder="Rechercher par titre ou ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    backgroundColor: alpha(theme.palette.primary.main, 0.02),
                  }
                }}
              />
              <Tooltip title="Filtres">
                <IconButton sx={{ 
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.12) }
                }}>
                  <FilterList color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Trier">
                <IconButton sx={{ 
                  bgcolor: alpha(theme.palette.primary.main, 0.08),
                  '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.12) }
                }}>
                  <Sort color="primary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Actualiser">
                <IconButton 
                  onClick={handleRefresh}
                  sx={{ 
                    bgcolor: alpha(theme.palette.success.main, 0.08),
                    '&:hover': { bgcolor: alpha(theme.palette.success.main, 0.12) }
                  }}
                >
                  <Refresh color="success" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* Table des tickets */}
          <TableContainer sx={{ maxHeight: '70vh' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ bgcolor: alpha(theme.palette.primary.main, 0.02), fontWeight: 600 }}>
                    ID
                  </TableCell>
                  <TableCell sx={{ bgcolor: alpha(theme.palette.primary.main, 0.02), fontWeight: 600 }}>
                    Titre
                  </TableCell>
                  <TableCell sx={{ bgcolor: alpha(theme.palette.primary.main, 0.02), fontWeight: 600 }}>
                    Statut
                  </TableCell>
                  <TableCell sx={{ bgcolor: alpha(theme.palette.primary.main, 0.02), fontWeight: 600 }}>
                    Priorité
                  </TableCell>
                  <TableCell sx={{ bgcolor: alpha(theme.palette.primary.main, 0.02), fontWeight: 600 }}>
                    Créé le
                  </TableCell>
                  <TableCell sx={{ bgcolor: alpha(theme.palette.primary.main, 0.02), fontWeight: 600 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTickets.map((ticket) => {
                  const priorityInfo = getPriorityInfo(ticket.priority);
                  const statusInfo = getStatusInfo(ticket.status);
                  
                  return (
                    <TableRow 
                      key={ticket.id}
                      hover
                      sx={{ 
                        '&:last-child td, &:last-child th': { border: 0 },
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.04)
                        },
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Avatar 
                            sx={{ 
                              width: 24, 
                              height: 24, 
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main,
                              fontSize: '0.75rem',
                              fontWeight: 600
                            }}
                          >
                            {ticket.id.toString().slice(-2)}
                          </Avatar>
                          <Typography variant="body2" fontWeight={500}>
                            #{ticket.id}
                          </Typography>
                        </Box>
                      </TableCell>
                      
                      <TableCell onClick={() => handleTicketClick(ticket.id)}>
                        <Typography fontWeight="medium" sx={{ mb: 0.5 }}>
                          {ticket.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Assigné à: {ticket.assignee || 'Non assigné'}
                        </Typography>
                      </TableCell>
                      
                      <TableCell>
                        <Chip 
                          label={statusInfo.label}
                          color={statusInfo.color}
                          size="small"
                          sx={{ 
                            borderRadius: 2,
                            fontWeight: 500,
                            textTransform: 'uppercase',
                            fontSize: '0.7rem'
                          }}
                        />
                      </TableCell>
                      
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: priorityInfo.color
                            }}
                          />
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              color: priorityInfo.color,
                              fontWeight: 500,
                              textTransform: 'capitalize'
                            }}
                          >
                            {ticket.priority}
                          </Typography>
                        </Box>
                      </TableCell>
                      
                      <TableCell>
                        <Typography variant="body2">
                          {new Date(ticket.createdAt).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(ticket.createdAt).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </Typography>
                      </TableCell>
                      
                      <TableCell>
                        <Tooltip title="Voir les détails">
                          <IconButton 
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTicketClick(ticket.id);
                            }}
                            sx={{ 
                              color: theme.palette.primary.main,
                              '&:hover': {
                                bgcolor: alpha(theme.palette.primary.main, 0.08)
                              }
                            }}
                          >
                            <Visibility fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
                
                {filteredTickets.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                      <Box sx={{ textAlign: 'center' }}>
                        <SearchIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                          {searchTerm ? 'Aucun ticket trouvé' : 'Aucun ticket'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {searchTerm 
                            ? 'Essayez de modifier votre recherche'
                            : 'Commencez par créer votre premier ticket'
                          }
                        </Typography>
                        {!searchTerm && (
                          <Button
                            variant="contained"
                            startIcon={<Add />}
                            onClick={() => navigate('/new-ticket')}
                            sx={{ mt: 2, borderRadius: 2 }}
                          >
                            Créer un ticket
                          </Button>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Panneau latéral avec actions rapides */}
        <ActivityCard
          title="Actions rapides"
          icon={<FilterList sx={{ color: 'white' }} />}
          iconBackground={theme.palette.primary.main}
        >
          {[
            { 
              title: 'Créer un ticket', 
              icon: <Add />, 
              color: theme.palette.primary.main,
              description: 'Nouveau ticket de support',
              onClick: () => navigate('/new-ticket')
            },
            { 
              title: 'Tickets ouverts', 
              icon: <CheckCircle />, 
              color: theme.palette.info.main,
              description: `${tickets.filter(t => t.status === 'open').length} tickets`,
              onClick: () => navigate('/tickets?status=open')
            },
            { 
              title: 'En attente', 
              icon: <Schedule />, 
              color: theme.palette.warning.main,
              description: `${tickets.filter(t => t.status === 'pending').length} tickets`,
              onClick: () => navigate('/tickets?status=pending')
            },
            { 
              title: 'Tickets fermés', 
              icon: <CheckCircle />, 
              color: theme.palette.success.main,
              description: `${tickets.filter(t => t.status === 'closed').length} tickets`,
              onClick: () => navigate('/tickets?status=closed')
            },
          ].map((action, index) => (
            <Box
              key={index}
              onClick={action.onClick}
              sx={{
                p: 2,
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  background: alpha(action.color, 0.08),
                  transform: 'translateX(4px)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    background: `${action.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: action.color,
                    flexShrink: 0
                  }}
                >
                  {action.icon}
                </Box>
                <Box>
                  <Typography variant="body2" fontWeight={500}>
                    {action.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {action.description}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </ActivityCard>
      </Box>
    </>
  );
};

const TicketsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();

  const handleTicketSelect = (ticketId: string | number) => {
    navigate(`/tickets/${ticketId}`);
  };

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden' }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3, md: 4 } }}>

        {/* Contenu principal */}
        <Box sx={{ minHeight: '60vh' }}>
          {!id ? (
            // Affichage de la liste des tickets
            <TicketsList onTicketSelect={handleTicketSelect} />
          ) : (
            // Pour les détails d'un ticket, on affiche dans un Paper
            <Paper sx={{ 
              borderRadius: 3, 
              overflow: 'hidden',
              boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.08)}`
            }}>
              <Outlet />
            </Paper>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default TicketsPage;