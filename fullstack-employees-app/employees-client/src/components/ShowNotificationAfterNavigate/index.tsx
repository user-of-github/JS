import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { notification } from 'antd';
import { NavigationStateKeys } from '../../routes';

const stateKeys = Object.keys(NavigationStateKeys) as Array<keyof typeof NavigationStateKeys>;

export const NotificationAfterNavigate: React.FC = () => {
  const location = useLocation();
  const [notificationApi, NotificationContextHolder] = notification.useNotification({
    placement: 'top',
    showProgress: true
  });

  useEffect(() => {
    const state = location.state;

    if (!state) {
      return;
    }

    stateKeys.forEach(key =>{
      const exactStateField = state[key];

      if (exactStateField) {
        notificationApi.open({
          message: NavigationStateKeys[key].message,
          type: NavigationStateKeys[key].type
        });
      }
    })
  }, []);

  return NotificationContextHolder;
}