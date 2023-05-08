import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';
import {
  ThemeProvider,
  CssBaseline,
  StyledEngineProvider,
} from '@mui/material';
import theme from './theme';
import Navigation from './navigation';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import { LocalizationProvider } from './common/components/LocalizationProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ErrorBoundary>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LocalizationProvider>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <BrowserRouter>
                <Navigation />
              </BrowserRouter>
            </ThemeProvider>
          </StyledEngineProvider>
        </LocalizationProvider>
      </PersistGate>
    </Provider>
  </ErrorBoundary>
);
