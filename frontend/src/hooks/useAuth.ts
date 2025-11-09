import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout as logoutAction,
} from '../store/slices/authSlice';
import { addNotification } from '../store/slices/notificationSlice';
import { authService } from '../services';
import { LoginCredentials, RegisterData } from '../types';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        dispatch(loginStart());
        const response = await authService.login(credentials);
        dispatch(loginSuccess(response));
        dispatch(
          addNotification({
            message: 'Successfully logged in!',
            type: 'success',
          })
        );
        navigate('/');
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Login failed';
        dispatch(loginFailure(errorMessage));
        dispatch(
          addNotification({
            message: errorMessage,
            type: 'error',
          })
        );
      }
    },
    [dispatch, navigate]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      try {
        dispatch(loginStart());
        const response = await authService.register(data);
        dispatch(loginSuccess(response));
        dispatch(
          addNotification({
            message: 'Registration successful!',
            type: 'success',
          })
        );
        navigate('/');
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Registration failed';
        dispatch(loginFailure(errorMessage));
        dispatch(
          addNotification({
            message: errorMessage,
            type: 'error',
          })
        );
      }
    },
    [dispatch, navigate]
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      dispatch(logoutAction());
      dispatch(
        addNotification({
          message: 'Successfully logged out',
          type: 'success',
        })
      );
      navigate('/login');
    } catch (err) {
      dispatch(logoutAction());
      navigate('/login');
    }
  }, [dispatch, navigate]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
  };
};
