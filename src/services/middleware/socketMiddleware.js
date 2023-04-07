export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const {
        wsInit,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsStop,
      } = wsActions;

      if (type === wsInit) {
        socket?.close();
        socket = new WebSocket(`${payload.url}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          dispatch({ type: onMessage, payload: JSON.parse(event.data) });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = {
            ...payload,
            token: localStorage.getItem('accessToken'),
          };
          socket.send(JSON.stringify(message));
        }

        if (type === wsStop) {
          socket.close();
        }
      }

      next(action);
    };
  };
};
