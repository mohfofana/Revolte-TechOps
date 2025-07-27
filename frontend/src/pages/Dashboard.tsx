import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Box, 
  CircularProgress,
  useTheme,
  Typography,
  Button
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { 
  TrendingUp,
  Add,
  Search as SearchIcon,
  FilterList,
  CheckCircle,
  Schedule,
  Warning,
  Refresh
} from '@mui/icons-material';

// Import des composants personnalisés
import { StatCard, HeaderCard, ActivityCard } from '../components/dashboard';
import { useStats } from '../hooks/useStats';

const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { stats, loading, error, refresh } = useStats();

  const handleRefresh = () => {
    refresh();
  };

  const handleCreateTicket = () => {
    navigate('/new-ticket');
  };

  const handleStatCardClick = (status: string) => {
    // Naviguer vers la liste des tickets avec le filtre de statut
    navigate(`/tickets?status=${status}`);
  };

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
              Chargement du tableau de bord...
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
              Erreur lors du chargement des statistiques: {typeof error === 'string' ? error : error?.message || 'Erreur inconnue'}
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<Refresh />} 
              onClick={handleRefresh}
              sx={{ mt: 2 }}
            >
              Réessayer
            </Button>
          </Box>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100vw', minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden' }}>
      <Container maxWidth="xl" sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 3, md: 4 } }}>
        {/* En-tête */}
        <HeaderCard
          title="Tableau de bord"
          subtitle="Vue d'ensemble de vos tickets et activités récentes"
          chips={[
            { label: "Aujourd'hui", color: 'primary', variant: 'outlined' },
            { label: `${stats.openTickets + stats.closedTickets + stats.inProgressTickets + (stats.totalTickets || 0)} tickets total`, variant: 'outlined' },
            { label: "Données en temps réel", color: 'success', variant: 'outlined' }
          ]}
          addButtonText="Nouveau ticket"
          onAddClick={handleCreateTicket}
        />

        {/* Cartes de statistiques */}
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            },
            gap: 3,
            mb: 4
          }}
        >
          <StatCard 
            title="Tickets ouverts" 
            value={stats.openTickets} 
            change="+8%" 
            trend="up"
            color={theme.palette.primary.main}
            icon={<CheckCircle />}
            clickable={true}
            onClick={() => handleStatCardClick('open')}
          />
          <StatCard 
            title="En attente" 
            value={stats.inProgressTickets} 
            change="+3%" 
            trend="up"
            color={theme.palette.warning.main}
            icon={<Schedule />}
            clickable={true}
            onClick={() => handleStatCardClick('pending')}
          />
          <StatCard 
            title="Tickets fermés" 
            value={stats.closedTickets} 
            change="+12%" 
            trend="up"
            color={theme.palette.success.main}
            icon={<CheckCircle />}
            clickable={true}
            onClick={() => handleStatCardClick('closed')}
          />
        </Box>

        {/* Bouton d'actualisation */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            sx={{ 
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: 'none',
              fontWeight: 500
            }}
          >
            Actualiser les données
          </Button>
        </Box>

        {/* Section principale */}
        <Box 
          sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              lg: '2fr 1fr'
            },
            gap: 3
          }}
        >
          <ActivityCard
            title="Activité récente"
            viewAllText="Voir tout"
          >
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                py: 8,
                textAlign: 'center' 
              }}
            >
              <TrendingUp sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Graphiques et métriques
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cette section affichera bientôt des graphiques détaillés de vos performances et tendances
              </Typography>
              <Typography variant="caption" sx={{ mt: 2, color: 'text.disabled' }}>
                Total des tickets: {stats.totalTickets || (stats.openTickets + stats.closedTickets + stats.inProgressTickets)}
              </Typography>
            </Box>
          </ActivityCard>
          
          <ActivityCard
            title="Actions rapides"
            iconBackground={theme.palette.primary.main}
            icon={<SearchIcon sx={{ color: 'white' }} />}
          >
            {[
              { 
                title: 'Créer un ticket', 
                icon: <Add />, 
                color: theme.palette.primary.main,
                onClick: handleCreateTicket
              },
              { 
                title: 'Rechercher', 
                icon: <SearchIcon />, 
                color: theme.palette.info.main,
                onClick: () => navigate('/search')
              },
              { 
                title: 'Filtrer', 
                icon: <FilterList />, 
                color: theme.palette.warning.main,
                onClick: () => navigate('/tickets')
              },
              { 
                title: 'Actualiser', 
                icon: <Refresh />, 
                color: theme.palette.success.main,
                onClick: handleRefresh
              },
            ].map((action, index) => (
              <Box
                key={index}
                onClick={action.onClick}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
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
                    '& > svg': {
                      fontSize: 20,
                      color: action.color
                    }
                  }}
                >
                  {action.icon}
                </Box>
                <Typography variant="body2" fontWeight={500}>
                  {action.title}
                </Typography>
              </Box>
            ))}
          </ActivityCard>
        </Box>

        {/* Section de debug (décommentez si nécessaire pour le développement) */}
        {/* 
        <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Données de debug:
          </Typography>
          <Typography variant="body2" component="pre" sx={{ fontSize: '0.75rem' }}>
            {JSON.stringify(stats, null, 2)}
          </Typography>
        </Box>
        */}
      </Container>
    </Box>
  );
};

export default Dashboard;