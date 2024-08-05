import './App.css';
import AssessmentForm from './components/forms/AssessmentForm/AssessmentForm.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CssBaseline, ThemeProvider, useMediaQuery, createTheme } from '@mui/material';
import React from 'react';
import ThemeToggle from './components/ThemeToggle.tsx';


const queryClient = new QueryClient();
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState<'light' | 'dark'>(prefersDarkMode ? 'dark' : 'light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <QueryClientProvider client={queryClient}>
          <ThemeToggle toggleColorMode={colorMode.toggleColorMode} />
          <div>
            <h1>Welcome to the Steam Logistics Assessment</h1>

            <AssessmentForm />
          </div>
        </QueryClientProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}


export default App;
