import { Box, Typography, Chip, IconButton, Button } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { Add, Search, FilterList, MoreVert } from '@mui/icons-material';

interface HeaderCardProps {
  title: string;
  subtitle: string;
  onSearch?: () => void;
  onFilter?: () => void;
  onMenuClick?: () => void;
  onAddClick?: () => void;
  addButtonText?: string;
  addButtonIcon?: React.ReactNode;
  chips?: Array<{ label: string; color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'; variant?: 'filled' | 'outlined' }>;
  children?: React.ReactNode;
}

const HeaderCard = ({
  title,
  subtitle,
  onSearch,
  onFilter,
  onMenuClick,
  onAddClick,
  addButtonText = 'Nouveau ticket',
  addButtonIcon = <Add />,
  chips = [],
  children
}: HeaderCardProps) => {
  return (
    <Box
      sx={{
        background: (theme) => `linear-gradient(135deg, 
          ${alpha(theme.palette.primary.main, 0.1)} 0%, 
          ${alpha(theme.palette.primary.main, 0.15)} 50%,
          ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        borderRadius: 4,
        p: { xs: 2, sm: 3, md: 4 },
        mb: 4,
        backdropFilter: 'blur(10px)',
        border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'stretch', sm: 'flex-start' },
        gap: 2,
        width: '100%'
      }}>
        <Box sx={{ flex: 1, minWidth: { xs: '100%', md: 'auto' } }}>
          <Typography
            variant="h3"
            fontWeight="800"
            gutterBottom
            sx={{
              background: 'linear-gradient(45deg, #1976d2, #4dabf5, #9c27b0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {subtitle}
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 1, 
            mt: 2,
            '& .MuiChip-root': {
              m: 0,
              '&:first-of-type': {
                ml: 0,
              },
              '&:last-of-type': {
                mr: 0,
              }
            }
          }}>
            {chips.map((chip, index) => (
              <Chip
                key={index}
                label={chip.label}
                color={chip.color || 'default'}
                variant={chip.variant || 'filled'}
                size="small"
                sx={{
                  borderRadius: 1,
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  height: 24,
                  '& .MuiChip-label': {
                    px: 1.5,
                    py: 0.5,
                  },
                }}
              />
            ))}
          </Box>
        </Box>
        
        <Box display="flex" gap={2} alignItems="center" sx={{ flexShrink: 0 }}>
          <Box display="flex" gap={1}>
            <IconButton
              onClick={onSearch}
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                background: (theme) => `linear-gradient(135deg, ${theme.palette.background.paper}, ${alpha(theme.palette.background.paper, 0.8)})`,
                backdropFilter: 'blur(10px)',
                border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.common.black, 0.05)}`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: (theme) => `0 8px 20px ${alpha(theme.palette.common.black, 0.1)}`,
                },
              }}
            >
              <Search fontSize="small" />
            </IconButton>
            <IconButton
              onClick={onFilter}
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                background: (theme) => `linear-gradient(135deg, ${theme.palette.background.paper}, ${alpha(theme.palette.background.paper, 0.8)})`,
                backdropFilter: 'blur(10px)',
                border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.common.black, 0.05)}`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: (theme) => `0 8px 20px ${alpha(theme.palette.common.black, 0.1)}`,
                },
              }}
            >
              <FilterList fontSize="small" />
            </IconButton>
            <IconButton
              onClick={onMenuClick}
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                background: (theme) => `linear-gradient(135deg, ${theme.palette.background.paper}, ${alpha(theme.palette.background.paper, 0.8)})`,
                backdropFilter: 'blur(10px)',
                border: (theme) => `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                boxShadow: (theme) => `0 4px 12px ${alpha(theme.palette.common.black, 0.05)}`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: (theme) => `0 8px 20px ${alpha(theme.palette.common.black, 0.1)}`,
                },
              }}
            >
              <MoreVert fontSize="small" />
            </IconButton>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            alignItems: 'center', 
            mt: { xs: 2, sm: 0 },
            alignSelf: { xs: 'stretch', sm: 'flex-start' }
          }}>
            <Button
              variant="contained"
              startIcon={addButtonIcon}
              onClick={onAddClick}
              size="large"
              fullWidth
              sx={{
                borderRadius: 3,
                textTransform: 'none',
                fontWeight: 600,
                px: 3,
                py: 1.5,
                whiteSpace: 'nowrap',
                minWidth: 'fit-content',
                boxShadow: (theme) => `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: (theme) => `0 8px 30px ${alpha(theme.palette.primary.main, 0.4)}`,
                },
              }}
            >
              {addButtonText}
            </Button>
          </Box>
        </Box>
      </Box>
      {children}
    </Box>
  );
};

export default HeaderCard;
