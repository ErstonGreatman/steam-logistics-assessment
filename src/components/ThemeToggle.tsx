import React from 'react';
import { Box, useTheme, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


type Props = {
  toggleColorMode: () => void;
};


/**
 * ThemeToggle: a quick component nabbed from the Material UI library to toggle the theme
 */
const ThemeToggle: React.FC<Props> = ({ toggleColorMode }: Props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        top: '.5rem',
        right: '.5rem',
      }}
    >
      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}

export default ThemeToggle;
