import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

export const NotificationContext = React.createContext();

const classNames = {
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-danger",
};

const MessageWrapper = styled.div`
  position: absolute;
  opacity: 0;
  right: 0;
  top: 20px;
  transform: translate(10vw);
  transition: all 0.5s ease-in-out;
  &.show {
    opacity: 1;
    transform: translate(-10px);
  }
`;

const NotificationProvider = ({ children }) => {
  const msgRef = useRef(null);
  const [state, setState] = useState({
    type: "info",
    message: null,
  });
  const { message, type } = state;

  useEffect(() => {
    message && msgRef.current.classList.add("show");

    setTimeout(() => {
      msgRef.current.classList.remove("show");

      setTimeout(() => {
        setState({ type: null, message: null });
      }, 500);

    }, 3000);
  }, [message]);

  const className = useMemo(() => classNames[type], [type]);

  const context = useMemo(
    () => ({
      showInfo: (msg) => setState({ type: "info", message: msg }),
      showSuccess: (msg) => setState({ type: "success", message: msg }),
      showError: (msg) => setState({ type: "error", message: msg }),
      message,
    }),
    [message]
  );

  return (
    <NotificationContext.Provider value={context}>
      {children}

      <MessageWrapper ref={msgRef}>
        <div className={`alert ${className}`} role="alert">
          {message}
        </div>
      </MessageWrapper>
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
