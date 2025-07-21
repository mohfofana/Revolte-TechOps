import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  CircularProgress,
  useTheme,
  useMediaQuery,
  Button,
  IconButton,
  Chip
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  TrendingUp,
  TrendingDown,
  Schedule,
  CheckCircle,
  Warning,
  Add,
  FilterList,
  Search,
  MoreVert,
  Refresh
} from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: number | string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color: string;
  icon: React.ReactNode;
}

const GlassCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 20,
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.background.paper, 0.8)} 0%, 
    ${alpha(theme.palette.background.paper, 0.6)} 100%)`,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: `0 8px 32px ${alpha(theme.palette.common.black, 0.08)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: `0 20px 60px ${alpha(theme.palette.common.black, 0.15)}`,
  },
}));

const FloatingButton = styled(Button)(({ theme }) => ({
  borderRadius: 16,
  textTransform: 'none',
  fontWeight: 600,
  padding: '12px 24px',
  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
  },
}));

const StatCard = ({ title, value, change, trend, color, icon }: StatCardProps) => {
  const theme = useTheme();
  
  return (
    <GlassCard elevation={0}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${color}15, ${color}25)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
            '& > svg': {
              fontSize: 24,
              color: color
            }
          }}
        >
          {icon}
        </Box>
        {change && (
          <Box display="flex" alignItems="center" gap={0.5}>
            {trend === 'up' && <TrendingUp sx={{ color: theme.palette.success.main, fontSize: 16 }} />}
            {trend === 'down' && <TrendingDown sx={{ color: theme.palette.error.main, fontSize: 16 }} />}
            <Typography 
              variant="caption" 
              sx={{ 
                color: trend === 'up' ? theme.palette.success.main : 
                       trend === 'down' ? theme.palette.error.main : 
                       theme.palette.text.secondary,
                fontWeight: 600 
              }}
            >
              {change}
            </Typography>
          </Box>
        )}
      </Box>
      
      <Typography 
        variant="h3" 
        fontWeight="700" 
        sx={{ 
          color,
          background: `linear-gradient(45deg, ${color}, ${color}AA)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1
        }}
      >
        {value}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" fontWeight={500}>
        {title}
      </Typography>
    </GlassCard>
  );
};

const HeaderCard = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${theme.palette.primary.main}15 0%, 
    ${theme.palette.primary.main}25 50%,
    ${theme.palette.secondary.main}15 100%)`,
  borderRadius: 24,
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

const ActivityCard = styled(GlassCard)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(3),
  minHeight: 400,
}));

const QuickActionButton = styled(IconButton)(({ theme }) => ({
  width: 48,
  height: 48,
  borderRadius: 12,
  background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${alpha(theme.palette.background.paper, 0.8)})`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.05)}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 8px 20px ${alpha(theme.palette.common.black, 0.1)}`,
  },
}));

interface DashboardStats {
  openTickets: number;
  closedTickets: number;
  pendingTickets: number;
}

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 
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
    <Box sx={{ 
      width: '100vw',
      minHeight: '100vh',
      bgcolor: 'background.default',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <Container 
        maxWidth="xl" 
        sx={{ 
          width: '100%',
          py: { xs: 2, sm: 4 }, 
          px: { xs: 2, sm: 3, md: 4 },
          mx: 'auto',
          flex: 1
        }}
      >
      {/* Header Section */}
      <HeaderCard>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" flexWrap="wrap" gap={2}>
          <Box sx={{ flex: 1, minWidth: { xs: '100%', md: 'auto' } }}>
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              fontWeight="800"
              gutterBottom
              sx={{
                background: 'linear-gradient(45deg, #1976d2, #4dabf5, #9c27b0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
              }}
            >
              Tableau de bord
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Vue d'ensemble de vos tickets et activités récentes
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap">
              <Chip label="Aujourd'hui" size="small" color="primary" variant="outlined" />
              <Chip label="44 tickets total" size="small" variant="outlined" />
              <Chip label="18% d'amélioration" size="small" color="success" variant="outlined" />
            </Box>
          </Box>
          
          <Box display="flex" gap={2} alignItems="center" sx={{ flexShrink: 0 }}>
            <Box display="flex" gap={1}>
              <QuickActionButton>
                <Search fontSize="small" />
              </QuickActionButton>
              <QuickActionButton>
                <FilterList fontSize="small" />
              </QuickActionButton>
              <QuickActionButton>
                <MoreVert fontSize="small" />
              </QuickActionButton>
            </Box>
            <FloatingButton 
              variant="contained" 
              startIcon={<Add />}
              size="large"
            >
              Nouveau ticket
            </FloatingButton>
          </Box>
        </Box>
      </HeaderCard>

      {/* Stats Cards */}
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

      {/* Recent Activity Section */}
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
        {/* Main Activity */}
        <ActivityCard>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h5" fontWeight="700">
              Activité récente
            </Typography>
            <Button size="small" sx={{ textTransform: 'none' }}>
              Voir tout
            </Button>
          </Box>
          
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}20, ${theme.palette.secondary.main}20)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 3,
              }}
            >
              <TrendingUp sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            </Box>
            <Typography variant="h6" fontWeight="600" gutterBottom>
              Graphiques et métriques
            </Typography>
            <Typography color="text.secondary" variant="body2" sx={{ maxWidth: 300, mx: 'auto' }}>
              Cette section affichera bientôt des graphiques détaillés de vos performances et tendances
            </Typography>
          </Box>
        </ActivityCard>

        {/* Side Panel */}
        <ActivityCard>
          <Typography variant="h6" fontWeight="700" gutterBottom>
            Actions rapides
          </Typography>
          
          <Box sx={{ mt: 3 }}>
            {[
              { title: 'Créer un ticket', icon: <Add />, color: theme.palette.primary.main },
              { title: 'Rechercher', icon: <Search />, color: theme.palette.info.main },
              { title: 'Filtrer', icon: <FilterList />, color: theme.palette.warning.main },
              { title: 'Actualiser', icon: <Refresh />, color: theme.palette.success.main },
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
          </Box>
        </ActivityCard>
      </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;