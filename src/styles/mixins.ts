import { css } from '@emotion/react';
import type { Theme } from '@mui/material/styles';

// Media queries breakpoints
const breakpoints = {
  xs: 0,     // Extra small devices (portrait phones)
  sm: 600,   // Small devices (landscape phones)
  md: 900,   // Medium devices (tablets)
  lg: 1200,  // Large devices (desktops)
  xl: 1536,  // Extra large devices (large desktops)
} as const;

type Breakpoint = keyof typeof breakpoints;

// Media query generator
const media = (key: Breakpoint) => {
  return (style: TemplateStringsArray | string) =>
    `@media (min-width: ${breakpoints[key]}px) { ${style} }`;
};

// Flexbox mixins
export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

export const flexBetween = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Card styles
export const cardStyle = (theme: Theme) => css`
  background: ${theme.palette.background.paper};
  border-radius: ${theme.shape.borderRadius}px;
  box-shadow: ${theme.shadows[2]};
  transition: all 0.3s ease;
  overflow: hidden;
  
  &:hover {
    box-shadow: ${theme.shadows[4]};
  }
`;

// Button styles
export const primaryButton = (theme: Theme) => css`
  background: ${theme.palette.primary.main};
  color: ${theme.palette.primary.contrastText};
  padding: 8px 16px;
  border-radius: ${theme.shape.borderRadius}px;
  font-weight: 500;
  text-transform: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${theme.palette.primary.dark};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Text utilities
export const truncate = (lines: number = 1) => css`
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

// Animation keyframes
export const fadeIn = css`
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  animation: fadeIn 0.3s ease-in-out;
`;

// Responsive utilities
export const responsive = {
  mobile: media('xs'),
  tablet: media('sm'),
  desktop: media('md'),
  largeDesktop: media('lg'),
  xlDesktop: media('xl'),
};

// Z-index layers
export const zIndex = {
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};

// Spacing helper
export const spacing = (multiplier: number = 1) => `${8 * multiplier}px`;

// Border radius
export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  round: '50%',
} as const;

// Shadows
export const shadows = {
  sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  md: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  lg: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
  xl: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
} as const;
