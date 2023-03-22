import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { WS_CONNECTION_START, WS_CONNECTION_STOP } from "../../services/actions/webSocket";
import { wsUrl } from "../../utils/constants";
import styles from "./feed-order.module.css";

const FeedOrder = ({ children, requestUrl = '' }) => {
  const dispatch = useDispatch()

    useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: {url: `${wsUrl}${requestUrl}`} });
    return () => dispatch({ type: WS_CONNECTION_STOP });
  }, [dispatch, requestUrl]);

  return (
    <div className={styles.section}>
      {children}
    </div>
  );
};

export default FeedOrder;

FeedOrder.propTypes = {
  children: PropTypes.node.isRequired,
};
