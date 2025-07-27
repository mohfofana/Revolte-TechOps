import { Box, Typography, Button } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface ActivityCardProps {
  title: string;
  onViewAll?: () => void;
  viewAllText?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconBackground?: string;
  emptyState?: {
    icon: React.ReactNode;
    title: string;
    description: string;
  };
}

const ActivityCard = ({
  title,
  onViewAll,
  viewAllText = 'Voir tout',
  children,
  icon,
  iconBackground,
  emptyState,
}: ActivityCardProps) => {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 4,
        background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)} 0%, ${alpha(theme.palette.background.paper, 0.6)} 100%)`,
        backdropFilter: 'blur(20px)',
        border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        boxShadow: (theme) => `0 8px 32px ${alpha(theme.palette.common.black, 0.08)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        minHeight: 400,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={2}>
          {icon && (
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: iconBackground || 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              {icon}
            </Box>
          )}
          <Typography variant="h5" fontWeight="700">
            {title}
          </Typography>
        </Box>
        {onViewAll && (
          <Button 
            size="small" 
            sx={{ textTransform: 'none', fontWeight: 600 }}
            onClick={onViewAll}
          >
            {viewAllText}
          </Button>
        )}
      </Box>
      
      {children || (emptyState ? (
        <Box sx={{ textAlign: 'center', py: 6, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: (theme) => `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
            }}
          >
            {emptyState.icon}
          </Box>
          <Typography variant="h6" fontWeight="600" gutterBottom>
            {emptyState.title}
          </Typography>
          <Typography color="text.secondary" variant="body2" sx={{ maxWidth: 300, mx: 'auto' }}>
            {emptyState.description}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ flex: 1 }}>{children}</Box>
      ))}
    </Box>
  );
};

export default ActivityCard;
