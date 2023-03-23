import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { WS_CONNECTION_START, WS_CONNECTION_STOP } from "../services/actions/webSocket";
import styles from "./feed.module.css";
import PropTypes from "prop-types";
import { getOrdersWsUrl } from "../utils/burger-api";

const Feed = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START, payload: { url: getOrdersWsUrl(true) } });
    return () => dispatch({ type: WS_CONNECTION_STOP });
  }, [dispatch]);

  return (
    <section className={styles.section}>
      <h2 className="text text_type_main-large">Лента заказов</h2>
      <div className={styles.table}>{children}</div>
    </section>
  );
};

export default Feed;

Feed.propTypes = {
  children: PropTypes.node.isRequired,
};
