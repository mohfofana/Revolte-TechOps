import { useState, useEffect } from 'react';
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
  MoreVert,
  CheckCircle,
  Schedule,
  Warning,
  Refresh
} from '@mui/icons-material';

// Import des composants personnalisés
import { StatCard, HeaderCard, ActivityCard } from '../components/dashboard';

// Interface pour les statistiques du tableau de bord
interface DashboardStats {
  openTickets: number;
  closedTickets: number;
  pendingTickets: number;
}

const Dashboard = () => {
  const theme = useTheme();
 
  const [stats, setStats] = useState<DashboardStats>({
    openTickets: 0,
    closedTickets: 0,
    pendingTickets: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800));

        const mockData: DashboardStats = {
          openTickets: 12,
          closedTickets: 27,
          pendingTickets: 5,
        };

        setStats(mockData);
        setError(null);
      } catch (err) {
        console.error('Erreur lors du chargement des statistiques:', err);
        setError('Impossible de charger les statistiques. Veuillez réessayer plus tard.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

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
              {error}
            </Typography>
            <Button variant="contained" startIcon={<Refresh />} sx={{ mt: 2 }}>
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
            { label: '44 tickets total', variant: 'outlined' },
            { label: "18% d'amélioration", color: 'success', variant: 'outlined' }
          ]}
          addButtonText="Nouveau ticket"
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
            color={theme.palette.warning.main} 
            icon={<Warning />}
          />
          <StatCard 
            title="Tickets fermés" 
            value={stats.closedTickets} 
            change="+15%" 
            trend="up"
            color={theme.palette.success.main} 
            icon={<CheckCircle />}
          />
          <StatCard 
            title="En attente" 
            value={stats.pendingTickets} 
            change="-3%" 
            trend="down"
            color={theme.palette.info.main} 
            icon={<Schedule />}
          />
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
            </Box>
          </ActivityCard>
          
          <ActivityCard
            title="Actions rapides"
            iconBackground={theme.palette.primary.main}
            icon={<SearchIcon sx={{ color: 'white' }} />}
          >
            {[
              { title: 'Créer un ticket', icon: <Add />, color: theme.palette.primary.main },
              { title: 'Rechercher', icon: <SearchIcon />, color: theme.palette.info.main },
              { title: 'Filtrer', icon: <FilterList />, color: theme.palette.warning.main },
              { title: 'Plus d\'options', icon: <MoreVert />, color: theme.palette.text.secondary },
            ].map((action, index) => (
              <Box
                key={index}
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
      </Container>
    </Box>
  );
};

export default Dashboard;