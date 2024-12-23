import React, {createContext, useContext, useMemo} from 'react';
import useNotification from "../Hooks/useNotification";
import Notification from "../Notification/Notification";
import PropTypes from "prop-types";

const NotificationContext = createContext(null);

export const NotificationProvider = ({children}) => {
  const {notification, displayNotification} = useNotification();

  const contextValue = useMemo(() => ({
    notification,
    displayNotification
  }), [notification, displayNotification]);

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <Notification notificationInfo={contextValue.notification}/>
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationContext);

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
}