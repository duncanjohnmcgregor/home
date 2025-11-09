import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import { ErrorBoundary, NotificationSnackbar, PrivateRoute, MainLayout } from './components/common';
import { Login, Register, ForgotPassword } from './pages/auth';
import { Dashboard } from './pages/dashboard';
import { Finances } from './pages/finances';
import { Health } from './pages/health';
import { Home } from './pages/home';
import { Social } from './pages/social';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <Router>
          <NotificationSnackbar />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <MainLayout />
                </PrivateRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="finances" element={<Finances />} />
              <Route path="health" element={<Health />} />
              <Route path="home" element={<Home />} />
              <Route path="social" element={<Social />} />
            </Route>

            {/* Catch all - redirect to dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;
