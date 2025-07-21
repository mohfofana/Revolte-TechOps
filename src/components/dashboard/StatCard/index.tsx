import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, change, trend, color, icon }: StatCardProps) => {
  return (
    <Box
      sx={{
        padding: 3,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha(color, 0.08)} 0%, ${alpha(color, 0.04)} 100%)`,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${alpha(color, 0.1)}`,
        boxShadow: `0 8px 32px ${alpha('#000', 0.08)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: `0 20px 60px ${alpha('#000', 0.15)}`,
        },
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: 3,
            background: `linear-gradient(135deg, ${alpha(color, 0.2)}, ${alpha(color, 0.1)})`,
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
            {trend === 'up' && <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />}
            {trend === 'down' && <TrendingDown sx={{ color: 'error.main', fontSize: 16 }} />}
            <Typography 
              variant="caption" 
              sx={{ 
                color: trend === 'up' ? 'success.main' : 
                       trend === 'down' ? 'error.main' : 
                       'text.secondary',
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
    </Box>
  );
};

export default StatCard;
