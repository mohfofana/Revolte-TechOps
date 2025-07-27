import { Box, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  color: string;
  icon: React.ReactNode;
  onClick?: () => void;
  clickable?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  trend,
  color,
  icon,
  onClick,
  clickable = false
}) => {
  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 3,
        background: `linear-gradient(135deg, ${alpha(color, 0.08)} 0%, ${alpha(color, 0.04)} 100%)`,
        backdropFilter: 'blur(20px)',
        border: `1px solid ${alpha(color, 0.1)}`,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          transform: clickable ? 'translateY(-4px)' : 'none',
          boxShadow: clickable ? '0 12px 40px rgba(0, 0, 0, 0.12)' : '0 8px 32px rgba(0, 0, 0, 0.08)',
          cursor: clickable ? 'pointer' : 'default',
        },
      }}
      onClick={handleClick}
    >
      <Box 
        component={clickable ? 'button' : 'div'}
        sx={{
          background: 'none',
          border: 'none',
          cursor: clickable ? 'pointer' : 'default',
          width: '100%',
          textAlign: 'left',
          p: 0,
          m: 0,
          '&:focus': {
            outline: 'none',
          },
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2} width="100%">
          <Box
            sx={{
              p: 1.5,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(color, 0.2)}, ${alpha(color, 0.1)})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& > svg': {
                fontSize: 24,
                color: color,
              },
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
                  fontWeight: 600,
                }}
              >
                {change}
              </Typography>
            </Box>
          )}
        </Box>
        
        <Typography 
          variant="h4" 
          component="div"
          sx={{ 
            fontWeight: 700, 
            mb: 1,
            background: `linear-gradient(45deg, ${color}, ${alpha(color, 0.7)})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            width: 'fit-content',
          }}
        >
          {value}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            fontWeight: 500,
            opacity: 0.9,
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatCard;
