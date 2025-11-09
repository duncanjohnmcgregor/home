import React, { useEffect } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { removeNotification } from '../../store/slices/notificationSlice';

const NotificationSnackbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector((state) => state.notification.notifications);
  const currentNotification = notifications[0];

  useEffect(() => {
    if (currentNotification) {
      const timer = setTimeout(() => {
        dispatch(removeNotification(currentNotification.id));
      }, currentNotification.duration || 5000);

      return () => clearTimeout(timer);
    }
  }, [currentNotification, dispatch]);

  const handleClose = () => {
    if (currentNotification) {
      dispatch(removeNotification(currentNotification.id));
    }
  };

  if (!currentNotification) return null;

  return (
    <Snackbar
      open={true}
      autoHideDuration={currentNotification.duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={currentNotification.type} sx={{ width: '100%' }}>
        {currentNotification.message}
      </Alert>
    </Snackbar>
  );
};

export default NotificationSnackbar;
